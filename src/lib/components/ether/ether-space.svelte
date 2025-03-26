<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  // Replace with proper motion library import
  // import { motion } from '@animotion/motion';
  import { enableKeyboardNavigation } from '$lib/utils/keyboard-navigation';
  import type { ContentItem } from '$lib/types';
  
  // Props
  export let spaceId: string;
  export let items: ContentItem[] = [];
  
  // Local state
  let element: HTMLElement;
  let spaceElement: HTMLElement;
  let zoomLevel = 1;
  let viewportX = 0;
  let viewportY = 0;
  
  // Clean-up function for keyboard navigation
  let cleanup: () => void;
  
  onMount(() => {
    // Simple fade-in with CSS transition instead of Motion library
    if (element) {
      element.style.opacity = '1';
    }
    
    // Set up keyboard navigation
    if (spaceElement) {
      cleanup = enableKeyboardNavigation(spaceElement, {
        onMove: (direction, amount) => {
          switch (direction) {
            case 'up':
              viewportY += amount;
              break;
            case 'down':
              viewportY -= amount;
              break;
            case 'left':
              viewportX += amount;
              break;
            case 'right':
              viewportX -= amount;
              break;
          }
        },
        onZoom: (direction) => {
          if (direction === 'in') {
            zoomIn();
          } else {
            zoomOut();
          }
        },
        moveStep: 20
      });
    }
  });
  
  onDestroy(() => {
    if (cleanup) cleanup();
  });
  
  // Zoom controls
  function zoomIn() {
    zoomLevel += 0.1;
  }
  
  function zoomOut() {
    if (zoomLevel > 0.2) {
      zoomLevel -= 0.1;
    }
  }
  
  // Reset view position
  function resetView() {
    viewportX = 0;
    viewportY = 0;
    zoomLevel = 1;
  }
</script>

<style>
  .fade-in {
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }
</style>

<div class="relative w-full h-[80vh] overflow-hidden border border-gray-200 bg-gray-50 rounded-lg">
  <div 
    bind:this={spaceElement}
    class="relative w-full h-full focus:outline-none"
    style="transform: scale({zoomLevel}) translate({viewportX}px, {viewportY}px);"
    tabindex="0"
  >
    <div bind:this={element} class="w-full h-full fade-in">
      {#each items as item (item.id)}
        <div
          class="absolute"
          style="transform: translate3d({item.positionX}px, {item.positionY}px, {item.positionZ}px);"
        >
          <slot {item} />
        </div>
      {/each}
    </div>
  </div>
  
  <div class="absolute bottom-4 right-4 flex gap-2">
    <button 
      class="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-gray-800 hover:bg-gray-100"
      on:click={zoomIn}
      aria-label="Zoom In"
    >
      +
    </button>
    <button 
      class="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-gray-800 hover:bg-gray-100"
      on:click={zoomOut}
      aria-label="Zoom Out"
    >
      -
    </button>
    <button 
      class="px-3 h-10 bg-white rounded-full shadow flex items-center justify-center text-gray-800 hover:bg-gray-100"
      on:click={resetView}
      aria-label="Reset View"
    >
      Reset
    </button>
  </div>
  
  <div class="absolute top-4 left-4 bg-white/80 px-3 py-1 rounded-md text-sm">
    Ether Space: {spaceId}
  </div>
</div> 