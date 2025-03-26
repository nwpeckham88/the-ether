<script lang="ts">
  import type { ContentItem } from '$lib/types';
  
  export let item: ContentItem;
  
  let loaded = false;
  let error = false;
  
  function handleLoad() {
    loaded = true;
  }
  
  function handleError() {
    error = true;
  }
</script>

<div class="p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg">
  {#if item.title}
    <h3 class="font-bold text-lg mb-2 px-2">{item.title}</h3>
  {/if}
  
  <div class="relative overflow-hidden rounded-md" style="min-height: 100px; min-width: 150px;">
    {#if !loaded && !error}
      <div class="absolute inset-0 flex items-center justify-center bg-gray-100">
        <div class="animate-pulse">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
      </div>
    {/if}
    
    {#if error}
      <div class="p-4 bg-red-50 text-red-500 text-center">
        <p>Failed to load image</p>
      </div>
    {:else}
      <img
        src={item.content}
        alt={item.title || 'Image'}
        class="max-w-full max-h-96 object-contain"
        on:load={handleLoad}
        on:error={handleError}
        style={loaded ? '' : 'opacity: 0;'}
      />
    {/if}
  </div>
  
  <div class="mt-2 flex justify-end text-xs text-gray-500 px-2">
    <button
      class="p-1 hover:text-blue-600"
      on:click={() => {
        // Open image in new tab
        window.open(item.content, '_blank');
      }}
    >
      View Full Size
    </button>
  </div>
</div> 