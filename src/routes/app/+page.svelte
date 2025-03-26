<script lang="ts">
  import { createId } from '@paralleldrive/cuid2';
  
  // Mock spaces data - in a real app, this would come from the server
  let spaces = [
    {
      id: "space1",
      name: "Project Brainstorm",
      createdBy: "You",
      createdAt: new Date('2023-08-15'),
      itemCount: 12
    },
    {
      id: "space2",
      name: "Design Ideas",
      createdBy: "You",
      createdAt: new Date('2023-09-20'),
      itemCount: 8
    },
    {
      id: "space3",
      name: "Meeting Notes",
      createdBy: "You",
      createdAt: new Date('2023-10-05'),
      itemCount: 5
    }
  ];
  
  // New space creation
  let showNewSpaceModal = false;
  let newSpaceName = '';
  
  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  }
  
  function createNewSpace() {
    if (!newSpaceName.trim()) return;
    
    const newSpace = {
      id: createId(),
      name: newSpaceName,
      createdBy: "You",
      createdAt: new Date(),
      itemCount: 0
    };
    
    spaces = [newSpace, ...spaces];
    newSpaceName = '';
    showNewSpaceModal = false;
  }
</script>

<div class="container mx-auto py-8">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">Your Ether Spaces</h1>
    <button
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      on:click={() => showNewSpaceModal = true}
    >
      Create New Space
    </button>
  </div>
  
  {#if spaces.length === 0}
    <div class="text-center py-12">
      <p class="text-gray-500 mb-4">You don't have any Ether Spaces yet</p>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        on:click={() => showNewSpaceModal = true}
      >
        Create Your First Space
      </button>
    </div>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each spaces as space (space.id)}
        <a 
          href={`/app/${space.id}`}
          class="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 transition-colors"
        >
          <h2 class="text-xl font-bold mb-2">{space.name}</h2>
          <div class="flex justify-between text-sm text-gray-500 mb-4">
            <span>Created by {space.createdBy}</span>
            <span>{formatDate(space.createdAt)}</span>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span class="text-gray-600">{space.itemCount} items</span>
            <span class="text-blue-600 font-medium">Enter Space →</span>
          </div>
        </a>
      {/each}
    </div>
  {/if}
  
  <!-- New Space Modal -->
  {#if showNewSpaceModal}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Create New Ether Space</h2>
        
        <div>
          <label for="spaceName" class="block text-sm font-medium text-gray-700">Space Name</label>
          <input
            type="text"
            id="spaceName"
            bind:value={newSpaceName}
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="My Awesome Space"
            required
          />
        </div>
        
        <div class="flex justify-end gap-2 mt-6">
          <button
            on:click={() => showNewSpaceModal = false}
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            on:click={createNewSpace}
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Space
          </button>
        </div>
      </div>
    </div>
  {/if}
</div> 