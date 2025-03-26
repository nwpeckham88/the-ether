<script lang="ts">
  // Import global styles
  import '../app.css';
  import LayoutShell from '$lib/components/ui/layout-shell.svelte';
  
  // Track whether user is logged in
  let isLoggedIn = false;
  
  if (typeof window !== 'undefined') {
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }
</script>

<LayoutShell>
  <svelte:fragment slot="header">
    <div class="py-3 flex justify-between items-center">
      <div>
        <a href="/" class="text-xl font-bold text-blue-600">The Ether</a>
      </div>
      <nav>
        <ul class="flex gap-4">
          <li><a href="/" class="px-3 py-2 rounded-md hover:bg-gray-100">Home</a></li>
          {#if isLoggedIn}
            <li><a href="/app" class="px-3 py-2 rounded-md hover:bg-gray-100">Spaces</a></li>
            <li>
              <button 
                class="px-3 py-2 rounded-md hover:bg-gray-100"
                on:click={() => {
                  localStorage.removeItem('isLoggedIn');
                  window.location.href = '/login';
                }}
              >
                Logout
              </button>
            </li>
          {:else}
            <li><a href="/login" class="px-3 py-2 rounded-md hover:bg-gray-100">Login</a></li>
            <li><a href="/register" class="px-3 py-2 rounded-md hover:bg-gray-100">Register</a></li>
          {/if}
        </ul>
      </nav>
    </div>
  </svelte:fragment>
  
  <slot />
  
  <svelte:fragment slot="footer">
    <div class="text-center text-gray-600 text-sm">
      <p>The Ether - A Local Network Sharing Application</p>
    </div>
  </svelte:fragment>
</LayoutShell> 