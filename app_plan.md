# The Ether - Comprehensive App Plan

## Overview
"The Ether" is a protected local network sharing application built with SvelteKit. It enables users to create and share virtual "Ether Spaces" where they can place various types of content (text, links, images, documents) in a 3D environment accessible to other users on the local network.

## Core Concept
- Protected single-page application with authentication
- 3D card-based UI with subtle animations
- Content sharing spaces for local network collaboration
- Real-time synchronization between instances

## Technology Stack
- **Frontend**: SvelteKit 2.0+ with TypeScript and Svelte runes
- **UI Components**: Custom lightweight UI components
- **Styling**: TailwindCSS v4
- **Animations**: Motion One with svelte-motion
- **Database**: better-sqlite3 with Drizzle ORM
- **Authentication**: Custom authentication with Argon2
- **Network Sync**: WebSockets via Socket.IO
- **File Processing**: Sharp for images, pdf.js for documents
- **Testing**: Vitest with @testing-library/svelte

## Library Integration

### Core Dependencies
```bash
# Initial setup
npm create svelte@latest the-ether
cd the-ether
npm install

# Core and Database
npm install better-sqlite3 drizzle-orm drizzle-kit
npm install argon2

# UI and Styling
npm install tailwindcss @tailwindcss/vite
npm install motion # Simplified animation library

# File Processing (lazy loaded)
npm install sharp # Server-side image processing
npm install pdfjs-dist # Client-side PDF viewing (dynamically imported)

# Real-time Communication
npm install socket.io socket.io-client

# Development
npm install -D vitest @testing-library/svelte
```

### Library Usage Guidelines

1. **TailwindCSS v4** - Use for:
   - All styling throughout the application
   - Utility-first approach for component styling
   - Custom theme variables for consistent design

2. **Motion One** - Use for:
   - 3D card transformations
   - Content item animations
   - Page transitions
   - Keep animations subtle and performant

3. **Custom Authentication** - Streamlined authentication:
   - Basic username/password auth with Argon2
   - Session management with cookies
   - Route protection
   - Skip complex features like OAuth/social login initially

4. **Drizzle ORM** - Efficient database operations:
   - Type-safe queries
   - Simple migrations
   - Basic CRUD operations
   - Skip complex relations and joins where possible

5. **Socket.IO** - Real-time features:
   - Content position updates
   - Space member presence
   - Skip complex pub/sub patterns initially

6. **File Processing** - Lazy loaded:
   - Sharp for server-side image optimization
   - PDF.js for client-side document viewing
   - Load only when needed for better initial bundle size

### Example of Simplified Component

```svelte
<!-- src/lib/components/ui/card.svelte -->
<script lang="ts">
  import { animate } from 'motion';
  import { onMount } from 'svelte';
  
  export let elevation = 1; // 1, 2, or 3
  
  let element: HTMLElement;
  
  onMount(() => {
    // Simple animation with Motion One
    animate(element, {
      scale: [0.95, 1],
      opacity: [0, 1]
    }, {
      duration: 0.3,
      easing: 'ease-out'
    });
  });
</script>

<div
  bind:this={element}
  class="bg-white rounded-lg p-4 {elevation === 1 
    ? 'shadow-sm' 
    : elevation === 2 
    ? 'shadow-md' 
    : 'shadow-lg'}"
  {...$$restProps}
>
  <slot />
</div>
```

### Optimized Store Pattern

```typescript
// src/lib/stores/create-store.ts
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

// Simplified store creator with optional real-time sync
export function createStore<T>(
  initial: T,
  options?: {
    sync?: boolean;
    channel?: string;
  }
): Writable<T> {
  const store = writable<T>(initial);
  
  if (options?.sync) {
    // Only set up Socket.IO listeners if sync is needed
    setupSync(store, options.channel);
  }
  
  return store;
}

// Usage example:
const spaceStore = createStore([], { 
  sync: true,
  channel: 'spaces' 
});
```

### Configuration Files

#### 1. Tailwind Configuration (tailwind.config.js)
```javascript
export default {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Custom colors if needed
      }
    },
  }
};
```

#### 2. Vite Configuration (vite.config.ts)
```typescript
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit()
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  },
  build: {
    // Split large dependencies into separate chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf-viewer': ['pdfjs-dist'],
          'socket-io': ['socket.io-client']
        }
      }
    },
    // Enable chunk size warnings
    chunkSizeWarningLimit: 500
  }
});
```

#### 3. TypeScript Configuration (tsconfig.json)
```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

## Database Schema (Drizzle ORM)

```typescript
// Schema definition for Drizzle ORM
import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

// Users table (extending existing Lucia schema)
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  lastLogin: integer('last_login', { mode: 'timestamp' }),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

// Add sessions table for authentication
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

// Ether spaces
export const etherSpaces = sqliteTable('ether_spaces', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  createdById: text('created_by_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  isPublic: integer('is_public', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

// Content items
export const contentItems = sqliteTable('content_items', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  etherSpaceId: text('ether_space_id').notNull().references(() => etherSpaces.id, { onDelete: 'cascade' }),
  createdById: text('created_by_id').notNull().references(() => users.id),
  contentType: text('content_type').notNull(), // 'text', 'link', 'image', 'document'
  content: text('content'), // For text and links
  positionX: integer('position_x').default(0), // Positioning within the space
  positionY: integer('position_y').default(0),
  positionZ: integer('position_z').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

// Media files (for images and documents)
export const mediaFiles = sqliteTable('media_files', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  contentItemId: text('content_item_id').notNull().references(() => contentItems.id, { onDelete: 'cascade' }),
  filename: text('filename').notNull(),
  mimeType: text('mime_type').notNull(),
  size: integer('size').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

// Space sharing
export const spaceSharing = sqliteTable('space_sharing', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  spaceId: text('space_id').notNull().references(() => etherSpaces.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  accessLevel: text('access_level').notNull().default('view'), // 'view', 'edit', 'admin'
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});
```

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login-form.svelte
│   │   │   ├── register-form.svelte
│   │   │   └── change-password-form.svelte
│   │   ├── ether/
│   │   │   ├── ether-space.svelte
│   │   │   ├── speed-dial.svelte
│   │   │   ├── content-item.svelte
│   │   │   ├── text-item.svelte
│   │   │   ├── link-item.svelte
│   │   │   ├── image-item.svelte
│   │   │   └── document-item.svelte
│   │   ├── ui/
│   │   │   ├── three-d-card.svelte
│   │   │   ├── nav-sidebar.svelte
│   │   │   ├── button.svelte
│   │   │   ├── input.svelte
│   │   │   ├── modal.svelte
│   │   │   └── layout-shell.svelte
│   ├── server/
│   │   ├── auth.ts
│   │   ├── socket.ts
│   │   ├── file-storage.ts
│   │   └── db/
│   │       ├── index.ts
│   │       └── schema.ts
│   ├── stores/
│   │   ├── ether-spaces-store.ts
│   │   ├── ether-content-store.ts
│   │   ├── synced-store.ts
│   │   └── init-stores.ts
│   ├── socket-client.ts
│   ├── types.ts
│   └── utils/
│       ├── media-helpers.ts
│       └── content-formatters.ts
├── routes/
│   ├── +layout.svelte
│   ├── +layout.server.ts
│   ├── +page.svelte (redirect to /app or /login)
│   ├── login/
│   │   ├── +page.svelte
│   │   └── +page.server.ts
│   ├── register/
│   │   ├── +page.svelte
│   │   └── +page.server.ts
│   ├── app/
│   │   ├── +layout.svelte
│   │   ├── +layout.server.ts
│   │   ├── +page.svelte (default space)
│   │   └── [spaceId]/
│   │       └── +page.svelte
│   └── api/
│       ├── spaces/
│       │   ├── +server.ts
│       │   └── [id]/
│       │       ├── +server.ts
│       │       └── content/
│       │           └── +server.ts
│       ├── content/
│       │   └── [id]/
│       │       └── +server.ts
│       └── upload/
│           └── +server.ts
└── hooks.server.ts
```

## Development Timeline

### Week 1: Foundation
- Set up project with streamlined dependencies
- Initialize database with Drizzle ORM
- Implement custom authentication with Argon2
- Create basic layout with custom UI components
- Set up basic routing and protection

### Week 2: Core Features
- Build Ether Space component with Motion One animations
- Implement basic content positioning with HTML5 Drag and Drop
- Create simplified store pattern with optional sync
- Set up basic Socket.IO communication

### Week 3: Content Management
- Add lazy-loaded file handling (Sharp + PDF.js)
- Implement content type components
- Add real-time content synchronization
- Create file upload and processing pipeline

### Week 4: Polish and Optimization
- Optimize bundle size and lazy loading
- Add loading states and error boundaries
- Implement responsive design
- Test and debug core features
- Prepare for deployment

## Key Simplifications

1. **Authentication**
   - Focus on username/password auth only
   - Simple session management
   - Basic route protection

2. **UI Components**
   - Custom lightweight UI components
   - Simple Motion One animations
   - Native HTML5 Drag and Drop

3. **State Management**
   - Simplified store pattern
   - Optional real-time sync
   - Basic CRUD operations

4. **File Handling**
   - Lazy loaded file processors
   - Basic image optimization
   - Simple document viewing

5. **Real-time Features**
   - Basic Socket.IO setup
   - Simple room-based communication
   - Essential real-time updates only

This streamlined approach focuses on:
- Essential features first
- Minimal dependencies
- Better performance
- Easier maintenance
- Faster development cycle

## Custom UI Components

### Core UI Components

#### Button Component
```svelte
<!-- src/lib/components/ui/button.svelte -->
<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  
  // Define the classes based on variant and size
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
  };
  
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };
  
  $: classes = `rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 
                ${variantClasses[variant]} ${sizeClasses[size]} 
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
</script>

<button 
  {type} 
  {disabled} 
  class={classes}
  on:click
  {...$$restProps}
>
  <slot />
</button>
```

#### Modal Component
```svelte
<!-- src/lib/components/ui/modal.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  
  export let open = false;
  export let title = '';
  export let closeOnEscape = true;
  export let closeOnOutsideClick = true;
  
  const dispatch = createEventDispatcher();
  
  function close() {
    dispatch('close');
  }
  
  function handleKeydown(e: KeyboardEvent) {
    if (closeOnEscape && e.key === 'Escape' && open) {
      close();
    }
  }
  
  function handleOutsideClick(e: MouseEvent) {
    if (closeOnOutsideClick && (e.target as HTMLElement).classList.contains('modal-backdrop')) {
      close();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div 
    class="fixed inset-0 z-50 overflow-y-auto"
    transition:fade={{ duration: 150 }}
  >
    <div 
      class="modal-backdrop flex min-h-screen items-center justify-center p-4 text-center sm:p-0"
      style="background-color: rgba(0, 0, 0, 0.5);"
      on:click={handleOutsideClick}
    >
      <div
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:w-full"
        transition:fly={{ y: 30, duration: 300 }}
      >
        {#if title}
          <div class="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <h3 class="text-lg font-medium text-gray-900">{title}</h3>
            <button 
              type="button"
              class="text-gray-400 hover:text-gray-500"
              on:click={close}
              aria-label="Close"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        {/if}
        
        <div class="px-4 py-3 sm:px-6">
          <slot />
        </div>
        
        {#if $$slots.footer}
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-200">
            <slot name="footer" />
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
```

## Conclusion

"The Ether" application combines modern web technologies to create an innovative local network sharing experience. By leveraging SvelteKit's powerful features, Tailwind CSS v4's styling capabilities, and real-time WebSocket communication, the app provides a seamless and visually appealing platform for sharing various types of content within a local network.

The 3D card-based UI, with its subtle animations and glass-like effects, creates an engaging user experience while maintaining functionality and performance. The real-time synchronization ensures that all users on the network can collaborate effectively within shared Ether Spaces.

