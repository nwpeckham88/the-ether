<script lang="ts">
  import { initSocket } from '$lib/socket-client';
  import type { ContentItem } from '$lib/types';
  import { setupKeyboardNavigation } from '$lib/utils/keyboard-navigation';
  import type { KeyboardNavHandlers } from '$lib/utils/keyboard-navigation';
  import type { EtherContent, EtherContentPosition } from '$lib/types/ether-content';
  import { convertToPositionObject } from '$lib/types/ether-content';

  // Convert exports to props using Svelte 5 runes
  let { spaceId, initialItems = [] } = $props<{
    spaceId: string;
    initialItems?: ContentItem[];
  }>();

  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 2;
  const ZOOM_STEP = 0.1;
  const PAN_STEP = 30;

  // Initialize items with proper position objects
  let items = $state(initialItems.map((item: ContentItem) => convertToPositionObject(item)));
  let container = $state<HTMLDivElement | null>(null);
  let zoomLevel = $state(1);
  let panX = $state(0);
  let panY = $state(0);
  let activeItem = $state<string | null>(null);
  let socket = $state<any>(null);

  function selectItem(id: string) {
    activeItem = id;
    // In Svelte 5, we can directly use the on:itemSelected event binding
    // without needing createEventDispatcher
  }

  function zoomIn() {
    if (zoomLevel < MAX_ZOOM) {
      zoomLevel = Math.min(MAX_ZOOM, zoomLevel + ZOOM_STEP);
    }
  }

  function zoomOut() {
    if (zoomLevel > MIN_ZOOM) {
      zoomLevel = Math.max(MIN_ZOOM, zoomLevel - ZOOM_STEP);
    }
  }

  function resetZoom() {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
  }

  function panLeft() {
    panX -= PAN_STEP;
  }

  function panRight() {
    panX += PAN_STEP;
  }

  function panUp() {
    panY -= PAN_STEP;
  }

  function panDown() {
    panY += PAN_STEP;
  }

  // This function can be used for both local updates and socket events
  function updateItemPosition(id: string, newPosition: EtherContentPosition) {
    // Find and update the item locally
    const index = items.findIndex((item: ContentItem) => item.id === id);
    if (index >= 0 && items[index]?.id) {
      // Create a new object with all required properties to satisfy EtherContent type
      const updatedItem = { 
        ...items[index], 
        position: newPosition,
        id: items[index]?.id || id // Ensure id is preserved and not optional
      };
      items[index] = updatedItem as EtherContent;
      items = [...items]; // Trigger reactivity
    }

    // Send update to other clients via socket
    if (socket) {
      socket.emit('content:move', {
        spaceId,
        contentId: id,
        position: newPosition
      });
    }
  }

  $effect(() => {
    // Connect to socket.io
    socket = initSocket();

    // Join the space with a mock user for now
    if (socket) {
      const mockUser = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name: 'User ' + Math.floor(Math.random() * 1000)
      };
      
      socket.emit('space:join', { spaceId, user: mockUser });

      // Listen for content movement from other users
      socket.on('content:moved', (data: { contentId: string, position: EtherContentPosition }) => {
        updateItemPosition(data.contentId, data.position);
      });

      // Listen for new content added by other users
      socket.on('content:added', (data: { content: EtherContent }) => {
        items = [...items, data.content];
      });
    }

    // Setup keyboard navigation
    const keyboardHandlers: KeyboardNavHandlers = {
      zoomIn,
      zoomOut,
      resetZoom,
      panLeft,
      panRight,
      panUp,
      panDown
    };

    const cleanupKeyNav = setupKeyboardNavigation(keyboardHandlers);

    return () => {
      cleanupKeyNav();
    };
  });

  // Clean up on component destruction
  $effect(() => {
    return () => {
      // Leave the space and disconnect
      if (socket) {
        socket.emit('space:leave', { spaceId });
        socket.disconnect();
      }
    };
  });
</script>

<div 
  class="ether-space"
  bind:this={container}
  style="--zoom: {zoomLevel}; --pan-x: {panX}px; --pan-y: {panY}px;"
>
  <div class="content-container">
    {#each items as item (item.id)}
      <div 
        class="content-item fade-in" 
        style="
          left: {item.position?.x ?? 0}px; 
          top: {item.position?.y ?? 0}px;
          z-index: {activeItem === item.id ? 10 : 1};
        "
        on:click={() => selectItem(item.id)}
        on:mousedown={(event) => {
          // Add drag handling
          const startX = event.clientX;
          const startY = event.clientY;
          const startPosX = item.position?.x ?? 0;
          const startPosY = item.position?.y ?? 0;
          
          const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;
            // Update position locally and notify other clients
            updateItemPosition(item.id, {
              x: startPosX + deltaX / zoomLevel,
              y: startPosY + deltaY / zoomLevel
            });
          };
          
          const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
          };
          
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
        }}
        data-id={item.id}
      >
        <div class="content-header">
          <div class="title">{item.title || 'Untitled'}</div>
          <div class="controls">
            <!-- Item controls here -->
          </div>
        </div>
        <div class="content-body">
          {#if item.type === 'text' || item.contentType === 'text'}
            <div class="text-content">{item.content}</div>
          {:else if item.type === 'image' || item.contentType === 'image'}
            <img src={item.url} alt={item.title || 'Image'} />
          {:else if item.type === 'document' || item.contentType === 'document'}
            <div class="file-content">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.filename || 'Download file'}
              </a>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <div class="zoom-controls">
    <button on:click={zoomOut}>-</button>
    <span>{Math.round(zoomLevel * 100)}%</span>
    <button on:click={zoomIn}>+</button>
    <button on:click={resetZoom}>Reset</button>
  </div>
</div>

<style>
  .ether-space {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--color-background-alt);
    background-image: 
      linear-gradient(rgba(150, 150, 150, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(150, 150, 150, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  .content-container {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: scale(var(--zoom)) translate(var(--pan-x), var(--pan-y));
    transform-origin: center;
    transition: transform 0.2s ease-out;
  }

  .content-item {
    position: absolute;
    min-width: 200px;
    max-width: 400px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    cursor: move;
  }

  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: var(--color-primary-100);
    border-bottom: 1px solid var(--color-border);
  }

  .content-body {
    padding: 12px;
    max-height: 300px;
    overflow: auto;
  }

  .text-content {
    white-space: pre-wrap;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .zoom-controls {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: white;
    border-radius: 4px;
    padding: 8px;
    display: flex;
    gap: 8px;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .zoom-controls button {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    cursor: pointer;
  }

  .zoom-controls button:hover {
    background: var(--color-background-hover);
  }
</style> 