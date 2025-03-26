<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Check if the user is logged in
    // In a real app, this would check for a valid session
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Redirect to the appropriate page
    if (isLoggedIn) {
      goto('/app');
    } else {
      goto('/login');
    }
  });
</script>

<div class="flex items-center justify-center min-h-screen">
  <div class="text-center">
    <h1 class="text-2xl font-bold mb-4">The Ether</h1>
    <p class="text-gray-600">Redirecting...</p>
    <div class="mt-4">
      <div class="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
    </div>
  </div>
</div>
