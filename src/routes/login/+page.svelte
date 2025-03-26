<script lang="ts">
  import { enhance } from '$app/forms';
</script>

<div class="flex min-h-screen flex-col items-center justify-center p-4">
  <div class="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md">
    <h1 class="mb-6 text-center text-2xl font-bold">Login to The Ether</h1>
    
    <form method="POST" class="space-y-4" use:enhance>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          required
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
        />
      </div>
      
      <button
        type="submit"
        class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Log In
      </button>
    </form>
    
    <div class="mt-4 text-center">
      <p class="text-sm text-gray-600">
        Don't have an account?
        <a href="/register" class="font-medium text-blue-600 hover:text-blue-500">Register</a>
      </p>
    </div>
  </div>
</div> 