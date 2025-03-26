<script lang="ts">
  import EtherSpace from '$lib/components/ether/ether-space.svelte';
  import type { ContentItem } from '$lib/types';
  
  // Get space ID from URL
  export let data;
  const { spaceId } = data;
  
  // Mock data for now - will be replaced with real data from server
  const items: ContentItem[] = [
    { 
      id: '1', 
      positionX: 100, 
      positionY: 100, 
      positionZ: 0,
      contentType: 'text',
      content: 'Welcome to this Ether Space! This is a text item that demonstrates content positioning.'
    },
    { 
      id: '2', 
      positionX: 400, 
      positionY: 150, 
      positionZ: -20,
      contentType: 'text',
      content: 'You can navigate this space using keyboard arrows or the zoom controls.'
    },
    { 
      id: '3', 
      positionX: 200, 
      positionY: 300, 
      positionZ: 10,
      contentType: 'link',
      content: 'https://svelte.dev',
      title: 'Svelte Website'
    }
  ];
</script>

<div class="container mx-auto py-4">
  <h1 class="text-2xl font-bold mb-6">Ether Space: {spaceId}</h1>
  
  <EtherSpace {spaceId} {items}>
    <svelte:fragment let:item>
      {#if item.contentType === 'text'}
        <div class="bg-white p-4 rounded-lg shadow-md max-w-xs">
          <p>{item.content}</p>
        </div>
      {:else if item.contentType === 'link'}
        <div class="bg-white p-4 rounded-lg shadow-md">
          <a 
            href={item.content} 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline flex items-center"
          >
            {item.title || item.content}
            <span class="ml-1">↗</span>
          </a>
        </div>
      {:else}
        <div class="bg-gray-200 p-4 rounded-lg">
          <p>Unknown content type</p>
        </div>
      {/if}
    </svelte:fragment>
  </EtherSpace>
</div> 