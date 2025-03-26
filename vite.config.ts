import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    // Split large dependencies into separate chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'ui-components': ['@skeletonlabs/skeleton'],
          'pdf-viewer': ['pdfjs-dist'],
          'socket-io': ['socket.io-client']
        }
      }
    },
    // Enable chunk size warnings
    chunkSizeWarningLimit: 500
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['@skeletonlabs/skeleton', '@animotion/motion']
  },
  // Enable source maps in development
  server: {
    fs: {
      strict: false
    }
  }
}); 