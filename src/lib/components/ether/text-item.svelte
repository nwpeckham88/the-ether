<script lang="ts">
  import type { ContentItem } from '$lib/types';
  
  export let item: ContentItem;
  export let isEditing = false;
  
  let editableContent = item.content || '';
  
  function handleBlur() {
    if (isEditing && editableContent !== item.content) {
      // In a real implementation, we would save the changes to the database
      item.content = editableContent;
      isEditing = false;
    }
  }
</script>

<div class="p-4 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg max-w-md">
  {#if item.title}
    <h3 class="font-bold text-lg mb-2">{item.title}</h3>
  {/if}
  
  {#if isEditing}
    <textarea
      bind:value={editableContent}
      on:blur={handleBlur}
      class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      rows="3"
      autofocus
    ></textarea>
  {:else}
    <p class="whitespace-pre-wrap">{item.content}</p>
  {/if}
  
  <div class="mt-2 flex justify-end text-xs text-gray-500">
    <button
      class="p-1 hover:text-blue-600"
      on:click={() => isEditing = !isEditing}
    >
      {isEditing ? 'Save' : 'Edit'}
    </button>
  </div>
</div> 