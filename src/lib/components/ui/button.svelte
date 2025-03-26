<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  
  // Define the classes based on variant and size
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
  };
  
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };
  
  $: classes = `rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 
                ${variantClasses[variant]} ${sizeClasses[size]} 
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
</script>

<button 
  {type} 
  {disabled} 
  class={classes}
  on:click
  {...$$restProps}
>
  <slot />
</button> 