# The Ether - Implementation Step-by-Step Plan ☐

## A. Project Overview ☐
The Ether is a protected local network sharing application built with SvelteKit. It enables users to create and share virtual "Ether Spaces" where they can place various types of content (text, links, images, documents) in a 3D environment accessible to other users on the local network.

## B. Git Workflow: Gitflow Methodology and Best Practices ☐

We'll use the Gitflow workflow to manage our development process. This branching model provides a robust framework for managing larger projects.

### B.1. Initial Git Setup ☑️

1. Initialize repository and create the develop branch: ☑️
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Project structure and dependencies"
   git branch develop
   git checkout develop
   git push -u origin develop
   ```

2. Optional: Install git-flow extension for convenience ☑️
   ```bash
   # On macOS
   brew install git-flow
   
   # On Windows (with Chocolatey)
   choco install gitflow-winhelpers
   
   # Initialize git-flow in the repository
   git flow init
   ```

### B.2. Branching Strategy ☑️

1. **Main Branches**: ☑️
   - `main`: Production code only, contains the official release history
   - `develop`: Integration branch for features, contains pre-production code

2. **Supporting Branches**: ☑️
   - `feature/*`: For new feature development (branched from and merged back to `develop`)
   - `release/*`: For preparing new production releases (branched from `develop`, merged to both `develop` and `main`)
   - `hotfix/*`: For urgent fixes to production code (branched from `main`, merged to both `develop` and `main`)

### B.3. Gitflow Best Practices ☑️

1. **Commit Best Practices**: ☑️
   - Make atomic, focused commits (one logical change per commit)
   - Write meaningful commit messages with a clear structure:
     ```
     [Component/Area]: Short summary (50 chars max)
     
     More detailed explanation if needed. Wrap lines at 72 
     characters. Explain what and why vs. how.
     
     - List important details as bullet points if helpful
     - Include any breaking changes or issues fixed
     
     Fixes #123
     ```
   - Commit often during feature development
   - Use `git commit --amend` for small fixes to your most recent commit
   - Use `git rebase -i` to clean up commits before pushing a feature

2. **Merging Best Practices**: ☑️
   - Always use `--no-ff` when merging feature branches to preserve history:
     ```bash
     git checkout develop
     git merge --no-ff feature/my-feature
     ```
   - This creates a merge commit even when a fast-forward would be possible
   - This makes it easier to see which commits were part of which feature

3. **Pulling Best Practices**: ☑️
   - Use rebase when pulling from develop or main to avoid unnecessary merge commits:
     ```bash
     git pull --rebase origin develop
     ```
   - Only do this for direct work on develop or main, not for feature branches

4. **Branch Naming Conventions**: ☑️
   - `feature/feature-name` - For new features
   - `release/X.Y.Z` - For release preparation
   - `hotfix/issue-description` - For critical production fixes

5. **Version Tagging**: ☑️
   - Tag all releases on the main branch with version numbers
   - Use semantic versioning (X.Y.Z)
   - Always include a descriptive message with tags

### B.4. Feature Development Workflow ☑️

1. **Start a feature**: ☑️
   ```bash
   # Without git-flow extensions
   git checkout develop
   git pull --rebase origin develop  # Get latest changes with rebase
   git checkout -b feature/new-feature
   
   # With git-flow extensions
   git flow feature start new-feature
   ```

2. **During feature development**: ☑️
   - Make regular, atomic commits
   - Push feature branch regularly for backup/collaboration:
     ```bash
     git push -u origin feature/new-feature
     ```
   - Keep your feature branch up to date with develop:
     ```bash
     git checkout develop
     git pull --rebase origin develop
     git checkout feature/new-feature
     git rebase develop
     ```

3. **Finish a feature**: ☑️
   ```bash
   # Without git-flow extensions
   git checkout develop
   git pull --rebase origin develop  # Get latest changes with rebase
   git merge --no-ff feature/new-feature  # Create a merge commit
   git push origin develop
   git branch -d feature/new-feature  # Delete local branch
   git push origin --delete feature/new-feature  # Delete remote branch
   
   # With git-flow extensions
   git flow feature finish -k new-feature  # -k keeps the branch for reference
   git push origin develop
   ```

### B.5. Release Workflow ☑️

1. **Start a release**: ☑️
   ```bash
   # Without git-flow extensions
   git checkout develop
   git pull --rebase origin develop
   git checkout -b release/1.0.0
   
   # With git-flow extensions
   git flow release start 1.0.0
   ```

2. **During release preparation**: ☑️
   - Only fix bugs, polish documentation and prepare for release
   - No new features at this stage
   - Bump version numbers in relevant files

3. **Finish a release**: ☑️
   ```bash
   # Without git-flow extensions
   git checkout main
   git pull origin main
   git merge --no-ff release/1.0.0
   git tag -a v1.0.0 -m "Release 1.0.0: Key features and improvements"
   git push origin main --tags
   
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff release/1.0.0
   git push origin develop
   
   git branch -d release/1.0.0
   git push origin --delete release/1.0.0
   
   # With git-flow extensions
   git flow release finish -m "Release 1.0.0" 1.0.0
   git push origin develop
   git push origin main --tags
   ```

### B.6. Hotfix Workflow ☑️

1. **Start a hotfix**: ☑️
   ```bash
   # Without git-flow extensions
   git checkout main
   git pull origin main
   git checkout -b hotfix/critical-issue
   
   # With git-flow extensions
   git flow hotfix start critical-issue
   ```

2. **Finish a hotfix**: ☑️
   ```bash
   # Without git-flow extensions
   git checkout main
   git pull origin main
   git merge --no-ff hotfix/critical-issue
   git tag -a v1.0.1 -m "Hotfix 1.0.1: Fixed critical issue"
   git push origin main --tags
   
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff hotfix/critical-issue
   git push origin develop
   
   git branch -d hotfix/critical-issue
   git push origin --delete hotfix/critical-issue
   
   # With git-flow extensions
   git flow hotfix finish -m "Hotfix: Fixed critical issue" critical-issue
   git push origin develop
   git push origin main --tags
   ```

## C. Phase 1: Project Setup and Foundation (Week 1) ☐

### C.1. Step 1: Initial Project Setup ☑️
1. Create new SvelteKit project ☑️
   ```bash
   # Using the latest SvelteKit CLI command (as of March 2025)
   npx sv create the-ether
   cd the-ether
   npm install
   ```
   
2. Install core dependencies ☑️
   ```bash
   # Database
   npm install better-sqlite3 drizzle-orm drizzle-kit
   
   # Authentication (Better Auth is recommended as of 2025)
   npm install better-auth
   
   # UI Components (choose one: shadcn-svelte or skeleton)
   # For shadcn-svelte
   npx shadcn-svelte@latest init
   
   # OR for Skeleton
   npm install @skeletonlabs/skeleton @skeletonlabs/tw-plugin
   
   # Animation
   npm install @animotion/motion
   
   # File Processing (lazy loaded)
   npm install sharp
   npm install pdfjs-dist
   
   # Real-time Communication
   npm install socket.io socket.io-client
   
   # Development
   npm install -D vitest @testing-library/svelte
   ```
   
3. Set up Gitflow branches ☑️
   ```bash
   # Initialize the repository with a meaningful commit message
   git init
   git add .
   git commit -m "Initial project setup: SvelteKit with core dependencies"
   
   # Create develop branch
   git branch develop
   git checkout develop
   git push -u origin develop
   ```

### C.2. Step 2: Configure Build Tools ☑️
1. Create feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop  # Always pull latest changes with rebase
   git checkout -b feature/build-config
   ```
   
2. Set up Tailwind configuration (`tailwind.config.js`) ☑️
   ```javascript
   // If using shadcn-svelte, this will be mostly configured during init
   // For Skeleton UI, add the following
   import { skeleton } from '@skeletonlabs/tw-plugin';

   export default {
     darkMode: 'class',
     content: ['./src/**/*.{html,js,svelte,ts}'],
     plugins: [skeleton({
       themes: {
         custom: [
           {
             name: 'ether-theme',
             properties: {
               // Custom theme properties for The Ether
               '--theme-font-family-base': 'Inter, system-ui, sans-serif',
               '--theme-rounded-base': '0.5rem',
               '--theme-rounded-container': '0.75rem'
             }
           }
         ]
       }
     })]
   };
   ```
   
3. Configure Vite for bundle optimization (`vite.config.ts`) ☑️
   ```typescript
   import { sveltekit } from '@sveltejs/kit/vite';
   import { defineConfig } from 'vite';

   export default defineConfig({
     plugins: [sveltekit()]
     build: {
       // Split large dependencies into separate chunks
       rollupOptions: {
         output: {
           manualChunks: {
             'ui-components': ['@skeletonlabs/skeleton'], // Or shadcn components
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
   
4. Set up TypeScript configuration (`tsconfig.json`) ☑️
   ```bash
   # After making changes
   git add tsconfig.json
   git commit -m "Build: Configure TypeScript with strict mode and paths"
   ```
   
5. Merge feature branch using no-fast-forward to preserve history ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/build-config -m "Merge feature/build-config: Build tool configurations"
   git push origin develop
   git branch -d feature/build-config
   git push origin --delete feature/build-config  # Clean up remote branch if it exists
   ```

### C.3. Step 3: Create Database Schema ☐
1. Create feature branch ☐
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/database-schema
   ```
   
2. Define database tables using Drizzle ORM ☐
   ```typescript
   // src/lib/server/db/schema.ts
   import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';
   import { createId } from '@paralleldrive/cuid2';

   // Users table (designed for BetterAuth)
   export const users = sqliteTable('users', {
     id: text('id').primaryKey().$defaultFn(() => createId()),
     email: text('email').notNull().unique(),
     passwordHash: text('password_hash').notNull(),
     emailVerified: integer('email_verified', { mode: 'boolean' }).default(false),
     lastLogin: integer('last_login', { mode: 'timestamp' }),
     isActive: integer('is_active', { mode: 'boolean' }).default(true),
     createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
   });

   // Sessions table for BetterAuth
   export const sessions = sqliteTable('sessions', {
     id: text('id').primaryKey(),
     userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
     userAgent: text('user_agent'),
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
   
3. Set up database migrations ☐
   ```bash
   # Create drizzle.config.ts
   echo 'import type { Config } from "drizzle-kit";

   export default {
     schema: "./src/lib/server/db/schema.ts",
     out: "./migrations",
     driver: "better-sqlite",
     dbCredentials: {
       url: "./data/sqlite.db"
     }
   } satisfies Config;' > drizzle.config.ts

   # Add migration scripts to package.json
   npm pkg set scripts.db:generate="drizzle-kit generate:sqlite"
   npm pkg set scripts.db:migrate="drizzle-kit migrate:sqlite"
   npm pkg set scripts.db:studio="drizzle-kit studio"

   # Create data directory
   mkdir -p data
   
   # After setting up migrations
   git add drizzle.config.ts package.json
   git commit -m "Database: Set up migration configuration"
   ```
   
4. Create database connection utility ☐
   ```typescript
   // src/lib/server/db/index.ts
   import { drizzle } from 'drizzle-orm/better-sqlite3';
   import Database from 'better-sqlite3';
   import * as schema from './schema';
   
   // Initialize SQLite database
   const sqlite = new Database('data/sqlite.db');
   
   // Initialize Drizzle ORM
   export const db = drizzle(sqlite, { schema });
   ```
   
5. Merge feature branch ☐
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/database-schema -m "Merge feature/database-schema: Database design and migrations"
   git push origin develop
   git branch -d feature/database-schema
   git push origin --delete feature/database-schema
   ```

### C.4. Step 4: Implement Authentication ☐
1. Create feature branch ☐
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/auth
   ```
   
2. Set up BetterAuth integration ☐
   ```typescript
   // src/lib/server/auth.ts
   import { BetterAuth } from 'betterauth';
   import { SQLiteSessionAdapter } from 'better-sqlite-session';
   import { dev } from '$app/environment';
   import Database from 'better-sqlite3';
   import { db } from '$lib/server/db';
   import { users, sessions } from '$lib/server/db/schema';

   // Initialize SQLite database for authentication
   const sessionDb = new Database('data/sessions.db');

   // Initialize BetterAuth
   export const auth = new BetterAuth({
     sessionAdapter: new SQLiteSessionAdapter(sessionDb),
     sessionOptions: {
       cookieName: 'session',
       cookieOptions: {
         secure: !dev,
         path: '/',
         httpOnly: true,
         maxAge: 60 * 60 * 24 * 7 // 1 week
       }
     },
     passwordHasher: 'argon2',
     userRepository: {
       async findById(id) {
         return await db.query.users.findFirst({
           where: (users, { eq }) => eq(users.id, id)
         });
       },
       async findByEmail(email) {
         return await db.query.users.findFirst({
           where: (users, { eq }) => eq(users.email, email)
         });
       }
     },
     sessionRepository: {
       async create(session) {
         await db.insert(sessions).values({
           id: session.id,
           userId: session.userId, 
           userAgent: session.userAgent,
           expiresAt: new Date(session.expiresAt),
           createdAt: new Date()
         });
       },
       async findById(id) {
         return await db.query.sessions.findFirst({
           where: (sessions, { eq }) => eq(sessions.id, id)
         });
       },
       async delete(id) {
         await db.delete(sessions).where(eq(sessions.id, id));
       }
     }
   });
   ```
   
3. Create app.d.ts type declarations ☐
   ```typescript
   // src/app.d.ts
   import type { BetterAuth } from 'betterauth';

   declare global {
     namespace App {
       interface Locals {
         auth: BetterAuth;
         user: {
           id: string;
           email: string;
           emailVerified: boolean;
           isActive: boolean;
         } | null;
       }
     }
   }

   // Required for TypeScript to work
   export {};
   ```
   
4. Implement server hooks for authentication ☐
   ```typescript
   // src/hooks.server.ts
   import { auth } from '$lib/server/auth';
   import type { Handle } from '@sveltejs/kit';

   export const handle: Handle = async ({ event, resolve }) => {
     // Add auth to locals
     event.locals.auth = auth;
     
     // Get user session
     const session = await auth.validateSession(event.cookies.get('session'));
     
     if (session) {
       event.locals.user = session.user;
     } else {
       event.locals.user = null;
     }
     
     // Resolve the request
     return await resolve(event);
   };
   ```
   
5. Create login and registration endpoints ☐
   ```typescript
   // src/routes/login/+page.server.ts
   import { fail, redirect } from '@sveltejs/kit';
   import type { Actions } from './$types';

   export const actions: Actions = {
     default: async ({ request, locals, cookies }) => {
       const formData = await request.formData();
       const email = formData.get('email');
       const password = formData.get('password');

       // Validate input
       if (
         typeof email !== 'string' ||
         typeof password !== 'string' ||
         !email ||
         !password
       ) {
         return fail(400, { error: 'Invalid input' });
       }

       try {
         // Authenticate user
         const result = await locals.auth.authenticateUser(email, password);
         
         if (result.success) {
           // Set session cookie
           cookies.set('session', result.sessionId, result.cookieOptions);
           
           throw redirect(302, '/app');
         } else {
           return fail(400, { error: 'Invalid credentials' });
         }
       } catch (e) {
         console.error('Authentication error:', e);
         return fail(400, { error: 'Invalid credentials' });
       }
     }
   };
   ```

   ```typescript
   // src/routes/register/+page.server.ts
   import { fail, redirect } from '@sveltejs/kit';
   import { db } from '$lib/server/db';
   import { users } from '$lib/server/db/schema';
   import { createId } from '@paralleldrive/cuid2';
   import type { Actions } from './$types';

   export const actions: Actions = {
     default: async ({ request, locals }) => {
       const formData = await request.formData();
       const email = formData.get('email');
       const password = formData.get('password');

       // Validate input
       if (
         typeof email !== 'string' ||
         typeof password !== 'string' ||
         !email ||
         !password
       ) {
         return fail(400, { error: 'Invalid input' });
       }

       try {
         // Hash password
         const passwordHash = await locals.auth.hashPassword(password);
         
         // Create new user
         await db.insert(users).values({
           id: createId(),
           email,
           passwordHash,
           emailVerified: false,
           isActive: true,
           createdAt: new Date()
         });

         throw redirect(303, '/login');
       } catch (e) {
         console.error('Registration error:', e);
         return fail(500, { error: 'Error creating user' });
       }
     }
   };
   ```
   
6. Set up route protection ☐
   ```typescript
   // src/routes/app/+layout.server.ts
   import { redirect } from '@sveltejs/kit';
   import type { LayoutServerLoad } from './$types';

   export const load: LayoutServerLoad = async ({ locals }) => {
     // Check if user is authenticated
     if (!locals.user) {
       throw redirect(302, '/login');
     }
     
     // Return user data
     return {
       user: locals.user
     };
   };
   ```
   
7. Merge feature branch ☐
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/auth -m "Merge feature/auth: Authentication using BetterAuth"
   git push origin develop
   git branch -d feature/auth
   git push origin --delete feature/auth
   ```

### C.5. Step 5: Create Base Layout and Pages ☐
1. Create feature branch ☐
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/base-ui
   ```
   
2. Create base layout with UI components ☐
   ```svelte
   <!-- src/routes/+layout.svelte -->
   <script lang="ts">
     // Using Svelte 5 runes for props
     let { children } = $props();
     
     import { AppShell, AppBar } from '@skeletonlabs/skeleton';
     // Or for shadcn-svelte:
     // import * as SheetPrimitive from '$lib/components/ui/sheet';
   </script>

   <AppShell>
     <svelte:fragment slot="header">
       <AppBar>
         <svelte:fragment slot="lead">
           <h1 class="text-xl font-bold">The Ether</h1>
         </svelte:fragment>
       </AppBar>
     </svelte:fragment>
     
     <main class="container mx-auto p-4">
       {@render children()}
     </main>
   </AppShell>
   ```
   
3. Set up navigation structure ☐
   ```svelte
   <!-- src/lib/components/ui/nav-sidebar.svelte -->
   <script lang="ts">
     // If using Svelte 5 runes for reactivity:
     let isLoggedIn = $props(Boolean);
     
     // Using tailwind for styling with either UI library
   </script>

   <nav class="flex flex-col gap-4 p-4">
     <a href="/" class="text-blue-600 hover:underline">Home</a>
     {#if isLoggedIn}
       <a href="/app" class="text-blue-600 hover:underline">My Spaces</a>
       <a href="/app/settings" class="text-blue-600 hover:underline">Settings</a>
       <form method="POST" action="/logout">
         <button type="submit" class="text-red-600 hover:underline">Logout</button>
       </form>
     {:else}
       <a href="/login" class="text-blue-600 hover:underline">Login</a>
       <a href="/register" class="text-blue-600 hover:underline">Register</a>
     {/if}
   </nav>
   ```
   
4. Implement redirect logic for authenticated/unauthenticated users ☐
   ```typescript
   // src/routes/+page.server.ts
   import { redirect } from '@sveltejs/kit';
   import type { PageServerLoad } from './$types';

   export const load: PageServerLoad = async ({ locals }) => {
     // Check if user is authenticated
     const session = await locals.auth.validate();
     
     if (session) {
       // Redirect authenticated users to app
       throw redirect(302, '/app');
     }
     
     // Unauthenticated users stay on homepage
     return {};
   };
   ```
   
   ```svelte
   <!-- src/routes/+page.svelte -->
   <script lang="ts">
     // Minimal landing page for unauthenticated users
   </script>

   <div class="flex flex-col items-center justify-center min-h-[80vh] text-center">
     <h1 class="text-4xl font-bold mb-4">Welcome to The Ether</h1>
     <p class="text-xl mb-8">A protected local network sharing application</p>
     <div class="flex gap-4">
       <a href="/login" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</a>
       <a href="/register" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Register</a>
     </div>
   </div>
   ```
   
5. Merge feature branch ☐
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/base-ui -m "Merge feature/base-ui: Base layout and navigation"
   git push origin develop
   git branch -d feature/base-ui
   git push origin --delete feature/base-ui
   ```

## D. Phase 2: Core Application Features (Week 2) ☐

### D.1. Step 6: Create the Ether Space Component ☐
1. Create feature branch ☐
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/ether-space
   ```
   
2. Build 3D card component with @animotion/motion ☐
   ```svelte
   <!-- src/lib/components/ether/ether-space.svelte -->
   <script lang="ts">
     import { animate } from '@animotion/motion';
     import { onMount } from 'svelte';
     
     // Using Svelte 5 runes for props
     let spaceId = $props(String);
     let items = $props(Array);
     
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
     class="relative w-full h-full"
   >
     {#each items as item (item.id)}
       <div
         class="absolute"
         style="transform: translate3d({item.positionX}px, {item.positionY}px, {item.positionZ}px);"
       >
         <!-- Content Item Component -->
         <slot {item} />
       </div>
     {/each}
   </div>
   ```
   
3. Implement the main Ether Space container ☐
   ```svelte
   <!-- src/routes/app/[spaceId]/+page.svelte -->
   <script lang="ts">
     import EtherSpace from '$lib/components/ether/ether-space.svelte';
     
     // Using Svelte 5 runes for page params
     let spaceId = $params(String);
     
     // Mock data for now
     let items = [
       { id: '1', positionX: 0, positionY: 0, positionZ: 0 },
       { id: '2', positionX: 100, positionY: 50, positionZ: -50 }
     ];
   </script>

   <EtherSpace {spaceId} {items}>
     <div>Content Item</div>
   </EtherSpace>
   ```
   
4. Set up basic keyboard navigation ☐
   ```typescript
   // src/lib/utils/keyboard-navigation.ts
   export function enableKeyboardNavigation(element: HTMLElement) {
     element.addEventListener('keydown', (event) => {
       switch (event.key) {
         case 'ArrowUp':
           // Move up
           break;
         case 'ArrowDown':
           // Move down
           break;
         // Add more cases as needed
       }
     });
   }
   ```
   
5. Add viewport and zoom controls ☐
   ```svelte
   <!-- src/lib/components/ether/ether-space.svelte -->
   <script lang="ts">
     // Zoom functionality
     let zoomLevel = $state(1);
     
     function zoomIn() {
       zoomLevel += 0.1;
     }
     
     function zoomOut() {
       zoomLevel -= 0.1;
     }
   </script>

   <div
     bind:this={element}
     class="relative w-full h-full"
     style="transform: scale({zoomLevel});"
   >
     {#each items as item (item.id)}
       <div
         class="absolute"
         style="transform: translate3d({item.positionX}px, {item.positionY}px, {item.positionZ}px);"
       >
         <!-- Content Item Component -->
         <slot {item} />
       </div>
     {/each}
   </div>

   <button on:click={zoomIn}>Zoom In</button>
   <button on:click={zoomOut}>Zoom Out</button>
   ```
    
6 . Merge feature branch ☐
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/ether-space -m "Merge feature/ether-space: 3D space environment"
   git push origin develop
   git branch -d feature/ether-space
   git push origin --delete feature/ether-space
   ```

### D.2. Step 7: Implement Content Positioning ☐
1. Create feature branch ☐
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/content-positioning
   ```
   
2. Set up HTML5 Drag and Drop functionality ☐
   ```svelte
   <!-- src/lib/components/ether/content-item.svelte -->