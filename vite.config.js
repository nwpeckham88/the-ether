import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit()
  ],
  build: {
    // Split large dependencies into separate chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf-viewer': ['pdfjs-dist'],
          'socket-io': ['socket.io-client'],
          'database': ['drizzle-orm']
        }
      }
    },
    // Enable chunk size warnings
    chunkSizeWarningLimit: 500
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      'motion',
      'drizzle-orm',
      'drizzle-orm/better-sqlite3'
    ]
  },
  // Enable source maps in development
  server: {
    fs: {
      strict: false
    }
  }
}); 