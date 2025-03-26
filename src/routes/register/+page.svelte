<script lang="ts">
  import { enhance } from '$app/forms';
  
  // With Svelte v5, we'd add any reactive state using $state
  let formState = $state({
    submitting: false,
    error: null as string | null
  });
  
  const handleSubmit = () => {
    formState.submitting = true;
    
    return ({ result }: { result: any }) => {
      formState.submitting = false;
      if (result.type === 'failure') {
        formState.error = result.data?.error as string || 'An error occurred';
      }
    };
  };
</script>

<div class="flex min-h-screen flex-col items-center justify-center p-4">
  <div class="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md">
    <h1 class="mb-6 text-center text-2xl font-bold">Register for The Ether</h1>
    
    <form 
      method="POST" 
      class="space-y-4" 
      use:enhance={handleSubmit}
    >
      {#if formState.error}
        <div class="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {formState.error}
        </div>
      {/if}
    
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          required
          disabled={formState.submitting}
        />
      </div>
      
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          required
          disabled={formState.submitting}
        />
      </div>
      
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          required
          disabled={formState.submitting}
        />
      </div>
      
      <button
        type="submit"
        class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        disabled={formState.submitting}
      >
        {formState.submitting ? 'Registering...' : 'Register'}
      </button>
    </form>
    
    <div class="mt-4 text-center">
      <p class="text-sm text-gray-600">
        Already have an account?
        <a href="/login" class="font-medium text-blue-600 hover:text-blue-500">Login</a>
      </p>
    </div>
  </div>
</div> 