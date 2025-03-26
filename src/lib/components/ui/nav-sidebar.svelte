<script lang="ts">
  // Using Svelte 5 runes for reactivity
  let isLoggedIn = $props(Boolean);
</script>

<nav class="flex flex-col gap-4 p-4">
  <a href="/" class="text-blue-600 hover:underline">Home</a>
  {#if isLoggedIn}
    <a href="/app" class="text-blue-600 hover:underline">My Spaces</a>
    <a href="/app/settings" class="text-blue-600 hover:underline">Settings</a>
    <form method="POST" action="/logout">
      <button type="submit" class="text-red-600 hover:underline">Logout</button>
    </form>
  {:else}
    <a href="/login" class="text-blue-600 hover:underline">Login</a>
    <a href="/register" class="text-blue-600 hover:underline">Register</a>
  {/if}
</nav> 