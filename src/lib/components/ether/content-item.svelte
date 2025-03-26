<script lang="ts">
  // Props
  export let type: 'text' | 'link' | 'image' | 'document' = 'text';
  export let content: string = '';
  export let title: string = '';
  export let metadata: Record<string, any> = {};
</script>

{#if type === 'text'}
  <div class="bg-white p-4 rounded-lg shadow-md max-w-xs">
    <p class="whitespace-pre-wrap">{content}</p>
  </div>
{:else if type === 'link'}
  <div class="bg-white p-4 rounded-lg shadow-md">
    <a 
      href={content} 
      target="_blank" 
      rel="noopener noreferrer"
      class="text-blue-600 hover:underline flex items-center"
    >
      {title || content}
      <span class="ml-1">↗</span>
    </a>
  </div>
{:else if type === 'image'}
  <div class="bg-white p-2 rounded-lg shadow-md">
    <img 
      src={content} 
      alt={title || 'Image'} 
      class="max-w-xs max-h-64 object-contain"
      loading="lazy"
    />
    {#if title}
      <p class="mt-2 text-sm text-center">{title}</p>
    {/if}
  </div>
{:else if type === 'document'}
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="flex items-center">
      <span class="mr-2">📄</span>
      <span>{title || 'Document'}</span>
    </div>
    <a 
      href={content} 
      target="_blank" 
      rel="noopener noreferrer"
      class="text-blue-600 hover:underline text-sm mt-1 block"
    >
      Open document
    </a>
  </div>
{:else}
  <div class="bg-gray-200 p-4 rounded-lg">
    <p>Unknown content type</p>
  </div>
{/if} 