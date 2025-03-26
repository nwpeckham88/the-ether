<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher<{
    add: { type: string }
  }>();
  
  let isOpen = false;
  
  function toggleMenu() {
    isOpen = !isOpen;
  }
  
  function addItem(type: string) {
    dispatch('add', { type });
    isOpen = false;
  }
</script>

<div class="fixed bottom-6 right-6 z-50">
  <!-- Speed dial menu items -->
  {#if isOpen}
    <div class="flex flex-col-reverse gap-2 mb-4 items-end">
      <button
        on:click={() => addItem('text')}
        class="flex items-center bg-white text-blue-700 shadow-lg rounded-full py-2 px-4 text-sm font-medium"
      >
        <span class="mr-2">Text</span>
        <span class="p-1 rounded-full bg-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 6.1H3M21 12.1H3M15 18.1H3"></path>
          </svg>
        </span>
      </button>
      
      <button
        on:click={() => addItem('link')}
        class="flex items-center bg-white text-blue-700 shadow-lg rounded-full py-2 px-4 text-sm font-medium"
      >
        <span class="mr-2">Link</span>
        <span class="p-1 rounded-full bg-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </span>
      </button>
      
      <button
        on:click={() => addItem('image')}
        class="flex items-center bg-white text-blue-700 shadow-lg rounded-full py-2 px-4 text-sm font-medium"
      >
        <span class="mr-2">Image</span>
        <span class="p-1 rounded-full bg-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </span>
      </button>
    </div>
  {/if}
  
  <!-- Main button -->
  <button
    on:click={toggleMenu}
    class="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
  >
    {#if isOpen}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    {/if}
  </button>
</div> 