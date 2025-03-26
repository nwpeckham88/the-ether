<script lang="ts">
  export let type = 'text';
  export let value = '';
  export let placeholder = '';
  export let disabled = false;
  export let required = false;
  export let error = '';
  export let label = '';
  export let id = '';
</script>

<div class="w-full">
  {#if label}
    <label for={id} class="block text-sm font-medium text-gray-700 mb-1">{label}</label>
  {/if}
  
  <input
    {id}
    {type}
    bind:value
    {placeholder}
    {disabled}
    {required}
    class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
           focus:border-blue-500 focus:outline-none focus:ring-blue-500
           {error ? 'border-red-500' : ''}
           {disabled ? 'bg-gray-100 cursor-not-allowed' : ''}"
    on:input
    on:blur
    on:focus
    {...$$restProps}
  />
  
  {#if error}
    <p class="mt-1 text-sm text-red-600">{error}</p>
  {/if}
</div> 