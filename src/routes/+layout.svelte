<script lang="ts">
  // Import Skeleton components
  import { AppShell, AppBar } from '@skeletonlabs/skeleton';
  
  // Import global styles
  import '../app.css';
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <h1 class="text-xl font-bold">The Ether</h1>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <a href="/" class="btn btn-sm variant-ghost-surface">Home</a>
        <a href="/login" class="btn btn-sm variant-ghost-surface">Login</a>
        <a href="/register" class="btn btn-sm variant-ghost-surface">Register</a>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  
  <main class="container mx-auto p-4">
    <slot />
  </main>
</AppShell> 