<script lang="ts">
  export let elevation = 1; // 1, 2, or 3
</script>

<div
  class="bg-white rounded-lg p-4 {elevation === 1 
    ? 'shadow-sm' 
    : elevation === 2 
    ? 'shadow-md' 
    : 'shadow-lg'}"
  {...$$restProps}
>
  <slot />
</div>

<!-- Note: Motion animations will be added later after resolving type issues --> 