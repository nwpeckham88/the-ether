<script lang="ts">
  import EtherSpace from '$lib/components/ether/ether-space.svelte';
  import ContentItem from '$lib/components/ether/content-item.svelte';
  import type { ContentItem as ContentItemType } from '$lib/types';
  import { page } from '$app/stores';
  
  // Ensure spaceId is always a string, with a default value if undefined
  const spaceId = $page.params['spaceId'] || 'default';
  
  // Mock data for testing
  const items: ContentItemType[] = [
    {
      id: '1',
      positionX: 100,
      positionY: 100,
      positionZ: 0,
      contentType: 'text',
      content: 'This is a text item in the Ether Space.',
      title: 'Text Note'
    },
    {
      id: '2',
      positionX: 400,
      positionY: 150,
      positionZ: 0,
      contentType: 'link',
      content: 'https://svelte.dev',
      title: 'Svelte Website'
    },
    {
      id: '3',
      positionX: 200,
      positionY: 300,
      positionZ: 0,
      contentType: 'text',
      content: 'You can move these items with drag and drop!',
    },
    {
      id: '4',
      positionX: 500,
      positionY: 400,
      positionZ: 0,
      contentType: 'text',
      content: 'Use arrow keys to navigate the space, and +/- to zoom.',
    }
  ];
  
  function handlePositionChange(event: CustomEvent) {
    console.log('Position changed:', event.detail);
    // In a real app, we would update the position in the store/database
  }
</script>

<div class="w-full h-[80vh]">
  <div class="flex items-center justify-between mb-4">
    <h1 class="text-2xl font-bold">Ether Space: {spaceId}</h1>
    <div class="text-sm">Use arrow keys to navigate, +/- to zoom</div>
  </div>
  
  <div class="w-full h-full border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
    <EtherSpace {spaceId} {items}>
      <svelte:fragment let:item>
        <ContentItem 
          id={item.id}
          positionX={item.positionX}
          positionY={item.positionY}
          positionZ={item.positionZ}
          contentType={item.contentType}
          content={item.content}
          on:positionchange={handlePositionChange}
        />
      </svelte:fragment>
    </EtherSpace>
  </div>
</div> 