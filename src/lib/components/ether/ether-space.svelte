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
  let zoomLevel = 1;
  let viewportX = 0;
  let viewportY = 0;
  let container: HTMLElement;
  let cleanupFunction: (() => void) | null = null;
  
  onMount(() => {
    // Simple fade-in with CSS transition instead of Motion library
    if (element) {
      element.style.opacity = '1';
    }
    
    // Set up keyboard navigation
    if (container) {
      cleanupFunction = enableKeyboardNavigation(container, {
        onMove: (x, y) => moveViewport(x, y),
        onZoom: (doZoomIn) => doZoomIn ? zoomIn() : zoomOut()
      });
      
      // Set initial focus to enable keyboard navigation
      container.focus();
      
      // Initialize transform
      updateTransform();
    }
  });
  
  onDestroy(() => {
    if (cleanupFunction) {
      cleanupFunction();
    }
  });
  
  // Zoom controls
  function zoomIn() {
    zoomLevel = Math.min(2, zoomLevel + 0.1);
    updateTransform();
  }
  
  function zoomOut() {
    zoomLevel = Math.max(0.5, zoomLevel - 0.1);
    updateTransform();
  }
  
  function moveViewport(deltaX: number, deltaY: number) {
    viewportX += deltaX;
    viewportY += deltaY;
    updateTransform();
  }
  
  function updateTransform() {
    if (container) {
      container.style.transform = `scale(${zoomLevel}) translate(${viewportX}px, ${viewportY}px)`;
    }
  }
  
  // Reset view position
  function resetView() {
    viewportX = 0;
    viewportY = 0;
    zoomLevel = 1;
    updateTransform();
  }
</script>

<div class="relative w-full h-full overflow-hidden">
  <div class="absolute top-4 right-4 flex gap-2 z-10">
    <button 
      class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      on:click={zoomIn}
      aria-label="Zoom in"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
    </button>
    <button 
      class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      on:click={zoomOut}
      aria-label="Zoom out"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"></path>
      </svg>
    </button>
    <button 
      class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      on:click={resetView}
      aria-label="Reset view"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path>
      </svg>
    </button>
  </div>
  
  <div 
    bind:this={container}
    class="relative w-full h-full origin-center transition-transform duration-200"
    tabindex="0"
    role="application"
    aria-label="Ether Space"
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
</div> 