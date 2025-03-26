<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  
  export let open = false;
  export let title = '';
  export let closeOnEscape = true;
  export let closeOnOutsideClick = true;
  
  const dispatch = createEventDispatcher();
  
  function close() {
    dispatch('close');
  }
  
  function handleKeydown(e: KeyboardEvent) {
    if (closeOnEscape && e.key === 'Escape' && open) {
      close();
    }
  }
  
  function handleOutsideClick(e: MouseEvent) {
    if (closeOnOutsideClick && (e.target as HTMLElement).classList.contains('modal-backdrop')) {
      close();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div 
    class="fixed inset-0 z-50 overflow-y-auto"
    transition:fade={{ duration: 150 }}
  >
    <div 
      class="modal-backdrop flex min-h-screen items-center justify-center p-4 text-center sm:p-0"
      style="background-color: rgba(0, 0, 0, 0.5);"
      on:click={handleOutsideClick}
    >
      <div
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:w-full"
        transition:fly={{ y: 30, duration: 300 }}
      >
        {#if title}
          <div class="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <h3 class="text-lg font-medium text-gray-900">{title}</h3>
            <button 
              type="button"
              class="text-gray-400 hover:text-gray-500"
              on:click={close}
              aria-label="Close"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        {/if}
        
        <div class="px-4 py-3 sm:px-6">
          <slot />
        </div>
        
        {#if $$slots.footer}
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-200">
            <slot name="footer" />
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if} 