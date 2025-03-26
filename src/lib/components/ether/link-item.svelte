<script lang="ts">
  import type { ContentItem } from '$lib/types';
  
  export let item: ContentItem;
  
  // Basic URL parser to extract domain for display
  function getDomain(url: string): string {
    try {
      const domain = new URL(url).hostname;
      return domain.startsWith('www.') ? domain.substring(4) : domain;
    } catch (e) {
      return url;
    }
  }
  
  // Ensure URL has protocol
  function ensureProtocol(url: string): string {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://${url}`;
  }
  
  $: safeUrl = ensureProtocol(item.content || '');
  $: domain = getDomain(safeUrl);
</script>

<a 
  href={safeUrl} 
  target="_blank" 
  rel="noopener noreferrer"
  class="block p-4 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 max-w-md"
>
  <div class="flex items-center gap-3">
    <div class="bg-blue-100 text-blue-700 p-2 rounded-full">
      <!-- Link icon - simple version -->
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>
    </div>
    <div>
      {#if item.title}
        <h3 class="font-bold text-blue-800 text-lg">{item.title}</h3>
      {:else}
        <h3 class="font-bold text-blue-800 text-lg">{domain}</h3>
      {/if}
      <p class="text-sm text-gray-600 truncate">{safeUrl}</p>
    </div>
  </div>
</a> 