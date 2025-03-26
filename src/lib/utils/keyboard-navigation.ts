export interface NavigationOptions {
  moveStep?: number;
  zoomStep?: number;
  onMove?: (x: number, y: number) => void;
  onZoom?: (zoomIn: boolean) => void;
}

/**
 * Enables keyboard navigation for a given element
 * Handles arrow keys for movement and + / - for zoom
 */
export function enableKeyboardNavigation(
  element: HTMLElement, 
  options: NavigationOptions = {}
) {
  const { 
    moveStep = 10, 
    zoomStep = 0.1,
    onMove,
    onZoom
  } = options;
  
  function handleKeydown(event: KeyboardEvent) {
    // Don't handle navigation if user is typing in an input/textarea
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement
    ) {
      return;
    }
    
    // Only handle if the element has focus or the event target is the element
    if (document.activeElement !== element && event.target !== element) {
      return;
    }
    
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (onMove) onMove(0, -moveStep);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (onMove) onMove(0, moveStep);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (onMove) onMove(-moveStep, 0);
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (onMove) onMove(moveStep, 0);
        break;
      case '+':
      case '=':
        event.preventDefault();
        if (onZoom) onZoom(true);
        break;
      case '-':
      case '_':
        event.preventDefault();
        if (onZoom) onZoom(false);
        break;
      case '0':
        // Reset view
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          if (onMove) onMove(0, 0);
        }
        break;
    }
  }
  
  // Add event listener
  element.addEventListener('keydown', handleKeydown);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeydown);
  };
} 