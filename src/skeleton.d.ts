declare module '@skeletonlabs/skeleton' {
  import type { SvelteComponent } from 'svelte';
  
  export class AppShell extends SvelteComponent<{
    slotHeader?: string;
    slotPageHeader?: string;
    slotSidebarLeft?: string;
    slotSidebarRight?: string;
    slotPageContent?: string;
    slotPageFooter?: string;
    slotFooter?: string;
  }> {}
  
  export class AppBar extends SvelteComponent<{
    slotLead?: string;
    slotDefault?: string;
    slotTrail?: string;
  }> {}

  // Add other components as needed
} 