/**
 * Enables keyboard navigation for the Ether Space component
 * @param element The HTML element to attach keyboard navigation to
 * @param options Configuration options
 */
export function enableKeyboardNavigation(
  element: HTMLElement,
  options: {
    onMove?: (direction: 'up' | 'down' | 'left' | 'right', amount: number) => void;
    onZoom?: (direction: 'in' | 'out', amount: number) => void;
    moveStep?: number;
    zoomStep?: number;
  } = {}
) {
  const {
    onMove = () => {},
    onZoom = () => {},
    moveStep = 10,
    zoomStep = 0.1
  } = options;
  
  // Handle keyboard events
  function handleKeyDown(event: KeyboardEvent) {
    // Prevent default browser behaviors for arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', '+', '-'].includes(event.key)) {
      event.preventDefault();
    }
    
    // Movement controls
    switch (event.key) {
      case 'ArrowUp':
        onMove('up', moveStep);
        break;
      case 'ArrowDown':
        onMove('down', moveStep);
        break;
      case 'ArrowLeft':
        onMove('left', moveStep);
        break;
      case 'ArrowRight':
        onMove('right', moveStep);
        break;
      case '+':
        onZoom('in', zoomStep);
        break;
      case '-':
        onZoom('out', zoomStep);
        break;
    }
  }
  
  // Add event listener
  element.addEventListener('keydown', handleKeyDown);
  
  // Make the element focusable if it isn't already
  if (!element.getAttribute('tabindex')) {
    element.setAttribute('tabindex', '0');
  }
  
  // Return a cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
} 