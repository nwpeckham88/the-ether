<script lang="ts">
  export let showHeader = true;
  export let showFooter = true;
</script>

<div class="flex flex-col min-h-screen">
  {#if showHeader && $$slots.header}
    <header class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4">
        <slot name="header" />
      </div>
    </header>
  {/if}
  
  <main class="flex-1">
    <slot />
  </main>
  
  {#if showFooter && $$slots.footer}
    <footer class="bg-gray-100 border-t border-gray-200 py-4">
      <div class="container mx-auto px-4">
        <slot name="footer" />
      </div>
    </footer>
  {/if}
</div> 