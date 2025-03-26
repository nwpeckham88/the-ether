<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  
  export let id: string;
  export let positionX = 0;
  export let positionY = 0;
  export let positionZ = 0;
  export let contentType: 'text' | 'link' | 'image' | 'document' = 'text';
  export let content: string = '';
  export let title: string | undefined = undefined;
  
  const dispatch = createEventDispatcher();
  
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let elementX = positionX;
  let elementY = positionY;
  let element: HTMLElement;
  
  function handleDragStart(event: MouseEvent) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    
    // Add global event listeners
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    
    // Prevent default to avoid text selection
    event.preventDefault();
  }
  
  function handleDragMove(event: MouseEvent) {
    if (!isDragging) return;
    
    // Calculate new position
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    
    elementX = positionX + deltaX;
    elementY = positionY + deltaY;
    
    // Update element position
    if (element) {
      element.style.transform = `translate3d(${elementX}px, ${elementY}px, ${positionZ}px)`;
    }
  }
  
  function handleDragEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    
    // Remove global event listeners
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('mouseup', handleDragEnd);
    
    // Update position and notify parent
    positionX = elementX;
    positionY = elementY;
    
    // Dispatch position change event
    dispatch('positionchange', {
      id,
      positionX,
      positionY,
      positionZ
    });
  }
  
  // Simple fade-in animation using CSS
  onMount(() => {
    if (element) {
      // Use simple CSS transition for the fade-in effect
      element.style.opacity = '0';
      setTimeout(() => {
        element.style.opacity = '1';
      }, 10);
    }
  });
</script>

<div
  bind:this={element}
  class="absolute cursor-grab bg-white rounded-md shadow-md p-4 select-none transition-opacity duration-300
        {isDragging ? 'cursor-grabbing z-10 shadow-lg' : ''}"
  style="transform: translate3d({positionX}px, {positionY}px, {positionZ}px)"
  on:mousedown={handleDragStart}
>
  {#if title}
    <h3 class="font-medium mb-1">{title}</h3>
  {/if}
  
  {#if contentType === 'text'}
    <div class="whitespace-pre-wrap">
      {content}
    </div>
  {:else if contentType === 'link'}
    <a href={content} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
      {title || content}
    </a>
  {:else if contentType === 'image'}
    <img src={content} alt={title || 'Image'} class="max-w-full rounded" loading="lazy" />
  {:else if contentType === 'document'}
    <div class="flex items-center gap-2">
      <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path>
      </svg>
      <span>{title || 'Document'}</span>
    </div>
  {/if}
  
  <slot />
</div> 