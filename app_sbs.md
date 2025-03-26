# The Ether - Implementation Step-by-Step Plan ☑️

## A. Project Overview ☑️
The Ether is a protected local network sharing application built with SvelteKit. It enables users to create and share virtual "Ether Spaces" where they can place various types of content (text, links, images, documents) in a 3D environment accessible to other users on the local network.

## B. Git Workflow: Gitflow Methodology and Best Practices ☑️

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

## C. Phase 1: Project Setup and Foundation (Week 1) ☑️

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
   
   # Authentication
   npm install argon2 # For password hashing
   
   # UI and Styling
   npm install tailwindcss @tailwindcss/vite
   
   # Animation
   npm install motion
   
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

### C.3. Step 3: Create Database Schema ☑️
1. Create feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/database-schema
   ```
   
2. Define database tables using Drizzle ORM ☑️
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
   
3. Set up database migrations ☑️
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
   
   # Run migrations
   npm run db:generate
   npm run db:migrate
   ```
   
4. Create database connection utility ☑️
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
   
5. Merge feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/database-schema -m "Merge feature/database-schema: Database design and migrations"
   git push origin develop
   git branch -d feature/database-schema
   ```

### C.4. Step 4: UI Component Setup ☑️
1. Set up Tailwind CSS v4 ☑️
   ```bash
   # Install Tailwind CSS and the Vite plugin
   npm install tailwindcss @tailwindcss/vite
   npm install @tailwindcss/postcss
   ```

2. Create Tailwind configuration file ☑️
   Create `tailwind.config.js` in the project root:
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

3. Create Vite configuration ☑️
   Create or update `vite.config.js` in the project root:
   ```javascript
   import { sveltekit } from '@sveltejs/kit/vite';
   import { defineConfig } from 'vite';
   import tailwindcss from '@tailwindcss/vite';

   export default defineConfig({
     plugins: [
       tailwindcss(),
       sveltekit()
     ]
   });
   ```

4. Set up main CSS file ☑️
   Create or update `src/app.css`:
   ```css
   @import "tailwindcss";
   
   /* Custom global styles */
   body {
     font-family: 'Inter', system-ui, -apple-system, sans-serif;
   }
   
   html, body {
     height: 100%;
   }
   
   :root {
     --color-primary-600: oklch(0.546 0.245 262.881);
     --color-primary-700: oklch(0.488 0.243 264.376);
     --color-white: #fff;
     --color-focus: oklch(0.623 0.214 259.815);
   }
   
   .fade-in {
     opacity: 0;
     transition: opacity 0.3s ease-out;
   }
   ```

5. Create a basic button component ☑️
   Create `src/lib/components/ui/button.svelte`:
   ```svelte
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

6. Create PostCSS configuration ☑️
   Create `postcss.config.js` in the project root:
   ```javascript
   export default {
     plugins: {
       autoprefixer: {},
       '@tailwindcss/postcss': {},
     },
   };
   ```

### C.5. Step 5: Authentication Setup ☐

1. Set up the auth utils file ☐
   Create `src/lib/server/auth.ts`:
   ```typescript
   import { randomBytes, pbkdf2Sync } from 'crypto';
   import { db } from './db';
   import { users, sessions } from './db/schema';
   import { eq } from 'drizzle-orm';
   import { createId } from '@paralleldrive/cuid2';
   
   // Password hashing configuration
   const ITERATIONS = 10000;
   const KEY_LENGTH = 64;
   const SALT_LENGTH = 16;
   const DIGEST = 'sha512';
   
   // Hash a password with PBKDF2
   export function hashPassword(password: string): string {
     const salt = randomBytes(SALT_LENGTH).toString('hex');
     const hash = pbkdf2Sync(
       password,
       salt,
       ITERATIONS,
       KEY_LENGTH,
       DIGEST
     ).toString('hex');
   
     return `${salt}:${hash}`;
   }
   
   // Verify a password against a hash
   export function verifyPassword(storedHash: string, password: string): boolean {
     const [salt, hash] = storedHash.split(':');
     
     if (!salt || !hash) return false;
     
     const calculatedHash = pbkdf2Sync(
       password,
       salt,
       ITERATIONS,
       KEY_LENGTH,
       DIGEST
     ).toString('hex');
     
     return hash === calculatedHash;
   }
   
   // Create a new user
   export async function createUser(userData: { 
     email: string; 
     password: string; 
     username?: string;
   }) {
     try {
       // Check if user already exists
       const existingUser = await db.query.users.findFirst({
         where: (users, { eq }) => eq(users.email, userData.email)
       });
       
       if (existingUser) {
         return { success: false, error: 'User already exists' };
       }
       
       // Create user
       const passwordHash = hashPassword(userData.password);
       const userId = createId();
       
       await db.insert(users).values({
         id: userId,
         email: userData.email,
         username: userData.username || userData.email.split('@')[0],
         passwordHash
       });
       
       return { success: true, userId };
     } catch (error) {
       console.error('Error creating user:', error);
       return { success: false, error: 'Failed to create user' };
     }
   }
   
   // Create a new session
   export async function createSession(userId: string) {
     try {
       const sessionId = createId();
       const expiresAt = new Date();
       expiresAt.setDate(expiresAt.getDate() + 7); // 1 week
       
         await db.insert(sessions).values({
         id: sessionId,
         userId,
         expiresAt
       });
       
       return { success: true, sessionId, expiresAt };
     } catch (error) {
       console.error('Error creating session:', error);
       return { success: false, error: 'Failed to create session' };
     }
   }
   
   // Validate a session
   export async function validateSession(sessionId: string) {
     try {
       const session = await db.query.sessions.findFirst({
         where: (sessions, { eq }) => eq(sessions.id, sessionId),
         with: {
           user: true
         }
       });
       
       if (!session) {
         return { valid: false };
       }
       
       if (new Date() > session.expiresAt) {
         await db.delete(sessions).where(eq(sessions.id, sessionId));
         return { valid: false };
       }
       
       return { valid: true, session, user: session.user };
     } catch (error) {
       console.error('Error validating session:', error);
       return { valid: false };
     }
   }
   
   // Delete a session (sign out)
   export async function deleteSession(sessionId: string) {
     try {
       await db.delete(sessions).where(eq(sessions.id, sessionId));
       return { success: true };
     } catch (error) {
       console.error('Error deleting session:', error);
       return { success: false, error: 'Failed to delete session' };
     }
   }
   ```

2. Create the server hooks for authentication ☐
   Create `src/hooks.server.ts`:
   ```typescript
   import { validateSession } from '$lib/server/auth';
   import type { Handle } from '@sveltejs/kit';

   export const handle: Handle = async ({ event, resolve }) => {
     const sessionId = event.cookies.get('session');
     
     if (sessionId) {
       const { valid, user } = await validateSession(sessionId);
     
       if (valid && user) {
         event.locals.user = user;
         event.locals.session = { id: sessionId };
     } else {
         // Clear invalid cookie
         event.cookies.delete('session', { path: '/' });
       }
     }
     
     return resolve(event);
   };
   ```
   
3. Set up login page server handler ☐
   Create `src/routes/login/+page.server.ts`:
   ```typescript
   import { db } from '$lib/server/db';
   import { users } from '$lib/server/db/schema';
   import { verifyPassword, createSession } from '$lib/server/auth';
   import { fail, redirect } from '@sveltejs/kit';
   import type { Actions } from './$types';

   export const actions: Actions = {
     default: async ({ request, cookies }) => {
       const formData = await request.formData();
       const email = formData.get('email')?.toString();
       const password = formData.get('password')?.toString();

       // Validate input
       if (!email || !password) {
         return fail(400, { 
           error: 'Email and password are required',
           email 
         });
       }

       try {
         // Find user by email
         const user = await db.query.users.findFirst({
           where: (users, { eq }) => eq(users.email, email)
         });
         
         if (!user) {
           return fail(400, { 
             error: 'Invalid email or password',
             email 
           });
         }
         
         // Verify password
         const passwordValid = verifyPassword(user.passwordHash, password);
         
         if (!passwordValid) {
           return fail(400, { 
             error: 'Invalid email or password',
             email 
           });
         }
         
         // Create new session
         const { success, sessionId, error } = await createSession(user.id);
         
         if (!success) {
           return fail(500, { 
             error: error || 'Failed to create session',
             email 
           });
         }
         
         // Set cookie
         cookies.set('session', sessionId, {
           path: '/',
           httpOnly: true,
           sameSite: 'strict',
           secure: process.env['NODE_ENV'] === 'production',
           maxAge: 60 * 60 * 24 * 7 // 1 week
         });
         
         // Update last login time
         await db.update(users)
           .set({ lastLogin: new Date() })
           .where(eq(users.id, user.id));
         
         // Redirect to app
         throw redirect(303, '/app');
       } catch (error) {
         console.error('Login error:', error);
         return fail(500, { 
           error: 'An unexpected error occurred',
           email 
         });
       }
     }
   };
   ```

4. Set up registration page server handler ☐
   Create `src/routes/register/+page.server.ts`:
   ```typescript
   import { createUser, createSession } from '$lib/server/auth';
   import { fail, redirect } from '@sveltejs/kit';
   import type { Actions } from './$types';

   export const actions: Actions = {
     default: async ({ request, cookies }) => {
       const formData = await request.formData();
       const email = formData.get('email')?.toString();
       const password = formData.get('password')?.toString();
       const confirmPassword = formData.get('confirmPassword')?.toString();

       // Validate input
       if (!email || !password || !confirmPassword) {
         return fail(400, { 
           error: 'All fields are required',
           email 
         });
       }
       
       if (password !== confirmPassword) {
         return fail(400, { 
           error: 'Passwords do not match',
           email 
         });
       }
       
       try {
         // Create user
         const { success, error, userId } = await createUser({
           email,
           password
         });
         
         if (!success) {
           return fail(400, { 
             error: error || 'Failed to create user',
             email 
           });
         }
         
         // Create session
         const sessionResult = await createSession(userId);
         
         if (!sessionResult.success) {
           return fail(500, { 
             error: sessionResult.error || 'Failed to create session',
             email 
           });
         }
         
         // Set cookie
         cookies.set('session', sessionResult.sessionId, {
           path: '/',
           httpOnly: true,
           sameSite: 'strict',
           secure: process.env['NODE_ENV'] === 'production',
           maxAge: 60 * 60 * 24 * 7 // 1 week
         });
         
         // Redirect to app
         throw redirect(303, '/app');
       } catch (error) {
         console.error('Registration error:', error);
         return fail(500, { 
           error: 'An unexpected error occurred',
           email 
         });
       }
     }
   };
   ```
   
### C.5. Step 5: Create Base Layout and Pages ☑️
1. Create feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/base-ui
   ```
   
2. Create base layout with UI components ☑️
   ```svelte
   <!-- src/routes/+layout.svelte -->
   <script lang="ts">
     // Import Skeleton components
     import { AppShell, AppBar } from '@skeletonlabs/skeleton';
     
     // Import global styles
     import '../app.css';
   </script>

   <AppShell>
     <svelte:fragment slot="header">
       <AppBar>
         <svelte:fragment slot="lead">
           <h1 class="text-xl font-bold">The Ether</h1>
         </svelte:fragment>
         <svelte:fragment slot="trail">
           <a href="/" class="btn btn-sm variant-ghost-surface">Home</a>
           <a href="/login" class="btn btn-sm variant-ghost-surface">Login</a>
           <a href="/register" class="btn btn-sm variant-ghost-surface">Register</a>
         </svelte:fragment>
       </AppBar>
     </svelte:fragment>
     
     <main class="container mx-auto p-4">
       <slot />
     </main>
   </AppShell>
   ```
   
3. Set up navigation structure ☑️
   ```svelte
   <!-- src/lib/components/ui/nav-sidebar.svelte -->
   <script lang="ts">
     // Using Svelte 5 runes for reactivity
     let isLoggedIn = $props(Boolean);
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
   
4. Implement redirect logic for authenticated/unauthenticated users ☑️
   ```typescript
   // src/routes/+page.server.ts
   import { redirect } from '@sveltejs/kit';
   import type { PageServerLoad } from './$types';

   export const load: PageServerLoad = async ({ locals }) => {
     // Check if user is authenticated
     if (locals.user) {
       // Redirect authenticated users to app
       throw redirect(302, '/app');
     }
     
     // Unauthenticated users stay on homepage
     return {};
   };
   ```
   
   ```svelte
   <!-- src/routes/+page.svelte -->
   <div class="flex flex-col items-center justify-center min-h-[80vh] text-center">
     <h1 class="text-4xl font-bold mb-4">Welcome to The Ether</h1>
     <p class="text-xl mb-8">A protected local network sharing application</p>
     <div class="flex gap-4">
       <a href="/login" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</a>
       <a href="/register" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Register</a>
     </div>
   </div>
   ```
   
5. Merge feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/base-ui -m "Merge feature/base-ui: Base layout and navigation"
   git push origin develop
   git branch -d feature/base-ui
   git push origin --delete feature/base-ui
   ```

## D. Phase 2: Core Application Features (Week 2) ☑️

### D.1. Step 6: Create the Ether Space Component ☑️
1. Create feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/ether-space
   ```
   
2. Build Ether Space component with keyboard navigation and zoom ☑️
   ```svelte
   <!-- src/lib/components/ether/ether-space.svelte -->
   <script lang="ts">
     import { onMount, onDestroy } from 'svelte';
     import { enableKeyboardNavigation } from '$lib/utils/keyboard-navigation';
     import type { ContentItem } from '$lib/types';
     
     // Props
     export let spaceId: string;
     export let items: ContentItem[] = [];
     
     // Local state
     let element: HTMLElement;
     let zoomLevel = 1;
     let viewportX = 0;
     let viewportY = 0;
     let container: HTMLElement;
     let cleanupFunction: (() => void) | null = null;
     
     onMount(() => {
       // Simple fade-in with CSS transition
       if (element) {
         element.style.opacity = '1';
       }
       
       // Set up keyboard navigation
       if (container) {
         cleanupFunction = enableKeyboardNavigation(container, {
           onMove: (x, y) => moveViewport(x, y),
           onZoom: (zoomIn) => zoomIn ? zoomIn() : zoomOut()
         });
         
         // Set initial focus to enable keyboard navigation
         container.focus();
         
         // Initialize transform
         updateTransform();
       }
     });
     
     onDestroy(() => {
       if (cleanupFunction) {
         cleanupFunction();
       }
     });
     
     // Zoom controls
     function zoomIn() {
       zoomLevel = Math.min(2, zoomLevel + 0.1);
       updateTransform();
     }
     
     function zoomOut() {
       zoomLevel = Math.max(0.5, zoomLevel - 0.1);
       updateTransform();
     }
     
     function moveViewport(deltaX: number, deltaY: number) {
       viewportX += deltaX;
       viewportY += deltaY;
       updateTransform();
     }
     
     function updateTransform() {
       if (container) {
         container.style.transform = `scale(${zoomLevel}) translate(${viewportX}px, ${viewportY}px)`;
       }
     }
     
     // Reset view position
     function resetView() {
       viewportX = 0;
       viewportY = 0;
       zoomLevel = 1;
       updateTransform();
     }
   </script>

   <div class="relative w-full h-full overflow-hidden">
     <div class="absolute top-4 right-4 flex gap-2 z-10">
       <button 
         class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
         on:click={zoomIn}
         aria-label="Zoom in"
       >
         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
         </svg>
       </button>
       <button 
         class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
         on:click={zoomOut}
         aria-label="Zoom out"
       >
         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"></path>
         </svg>
       </button>
       <button 
         class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
         on:click={resetView}
         aria-label="Reset view"
       >
         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path>
         </svg>
       </button>
     </div>
     
     <div 
       bind:this={container}
       class="relative w-full h-full origin-center transition-transform duration-200"
       tabindex="0"
       role="application"
       aria-label="Ether Space"
     >
       <div bind:this={element} class="w-full h-full fade-in">
     {#each items as item (item.id)}
       <div
         class="absolute"
         style="transform: translate3d({item.positionX}px, {item.positionY}px, {item.positionZ}px);"
       >
         <slot {item} />
       </div>
     {/each}
       </div>
     </div>
   </div>
   ```
   
3. Implement keyboard navigation utility ☑️
   ```typescript
   // src/lib/utils/keyboard-navigation.ts
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
   ```
   
4. Create content type definitions ☑️
   ```typescript
   // src/lib/types.ts
   // Content item interface
   export interface ContentItem {
     id: string;
     positionX: number;
     positionY: number;
     positionZ: number;
     contentType: 'text' | 'link' | 'image' | 'document';
     content: string;
     title?: string;
   }

   // User interface
   export interface User {
     id: string;
     email: string;
     username?: string;
     lastLogin?: Date;
     isActive: boolean;
   }

   // Session interface
   export interface Session {
     id: string;
     userId: string;
     expiresAt: Date;
   }
   ```
   
5. Add Ether Space to main routes ☑️
   ```svelte
   <!-- src/routes/app/[spaceId]/+page.svelte -->
   <script lang="ts">
     import EtherSpace from '$lib/components/ether/ether-space.svelte';
     import ContentItem from '$lib/components/ether/content-item.svelte';
     import type { ContentItem as ContentItemType } from '$lib/types';
     import { page } from '$app/stores';
     
     // Ensure spaceId is always a string, with a default value if undefined
     const spaceId = $page.params['spaceId'] || 'default';
     
     // Mock data for testing
     const items: ContentItemType[] = [
       {
         id: '1',
         positionX: 100,
         positionY: 100,
         positionZ: 0,
         contentType: 'text',
         content: 'This is a text item in the Ether Space.',
         title: 'Text Note'
       },
       {
         id: '2',
         positionX: 400,
         positionY: 150,
         positionZ: 0,
         contentType: 'link',
         content: 'https://svelte.dev',
         title: 'Svelte Website'
       },
       {
         id: '3',
         positionX: 200,
         positionY: 300,
         positionZ: 0,
         contentType: 'text',
         content: 'You can move these items with drag and drop!',
       },
       {
         id: '4',
         positionX: 500,
         positionY: 400,
         positionZ: 0,
         contentType: 'text',
         content: 'Use arrow keys to navigate the space, and +/- to zoom.',
       }
     ];
     
     function handlePositionChange(event: CustomEvent) {
       console.log('Position changed:', event.detail);
       // In a real app, we would update the position in the store/database
     }
   </script>

   <div class="w-full h-[80vh]">
     <div class="flex items-center justify-between mb-4">
       <h1 class="text-2xl font-bold">Ether Space: {spaceId}</h1>
       <div class="text-sm">Use arrow keys to navigate, +/- to zoom</div>
     </div>
     
     <div class="w-full h-full border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
   <EtherSpace {spaceId} {items}>
         <svelte:fragment let:item>
           <ContentItem 
             id={item.id}
             positionX={item.positionX}
             positionY={item.positionY}
             positionZ={item.positionZ}
             contentType={item.contentType}
             content={item.content}
             on:positionchange={handlePositionChange}
           />
         </svelte:fragment>
   </EtherSpace>
     </div>
   </div>
   ```

### D.2. Step 7: Implement Content Positioning ☑️
1. Create feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/content-positioning
   ```
   
2. Set up HTML5 Drag and Drop functionality ☑️
   ```svelte
   <!-- src/lib/components/ether/content-item.svelte -->
   <script lang="ts">
     import { createEventDispatcher } from 'svelte';
     import { onMount } from 'svelte';
     
     export let id: string;
     export let positionX = 0;
     export let positionY = 0;
     export let positionZ = 0;
     export let contentType: 'text' | 'link' | 'image' | 'document' = 'text';
     export let content: string = '';
     export let title: string | undefined = undefined;
     
     const dispatch = createEventDispatcher();
     
     let isDragging = false;
     let startX = 0;
     let startY = 0;
     let elementX = positionX;
     let elementY = positionY;
     let element: HTMLElement;
     
     function handleDragStart(event: MouseEvent) {
       isDragging = true;
       startX = event.clientX;
       startY = event.clientY;
       
       // Add global event listeners
       window.addEventListener('mousemove', handleDragMove);
       window.addEventListener('mouseup', handleDragEnd);
       
       // Prevent default to avoid text selection
       event.preventDefault();
     }
     
     function handleDragMove(event: MouseEvent) {
       if (!isDragging) return;
       
       // Calculate new position
       const deltaX = event.clientX - startX;
       const deltaY = event.clientY - startY;
       
       elementX = positionX + deltaX;
       elementY = positionY + deltaY;
       
       // Update element position
       if (element) {
         element.style.transform = `translate3d(${elementX}px, ${elementY}px, ${positionZ}px)`;
       }
     }
     
     function handleDragEnd() {
       if (!isDragging) return;
       
       isDragging = false;
       
       // Remove global event listeners
       window.removeEventListener('mousemove', handleDragMove);
       window.removeEventListener('mouseup', handleDragEnd);
       
       // Update position and notify parent
       positionX = elementX;
       positionY = elementY;
       
       // Dispatch position change event
       dispatch('positionchange', {
         id,
         positionX,
         positionY,
         positionZ
       });
     }
     
     // Simple fade-in animation using CSS
     onMount(() => {
       if (element) {
         // Use simple CSS transition for the fade-in effect
         element.style.opacity = '0';
         setTimeout(() => {
           element.style.opacity = '1';
         }, 10);
       }
     });
   </script>

   <div
     bind:this={element}
     class="absolute cursor-grab bg-white rounded-md shadow-md p-4 select-none transition-opacity duration-300
           {isDragging ? 'cursor-grabbing z-10 shadow-lg' : ''}"
     style="transform: translate3d({positionX}px, {positionY}px, {positionZ}px)"
     on:mousedown={handleDragStart}
   >
     {#if title}
       <h3 class="font-medium mb-1">{title}</h3>
     {/if}
     
     {#if contentType === 'text'}
       <div class="whitespace-pre-wrap">
         {content}
       </div>
     {:else if contentType === 'link'}
       <a href={content} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
         {title || content}
       </a>
     {:else if contentType === 'image'}
       <img src={content} alt={title || 'Image'} class="max-w-full rounded" loading="lazy" />
     {:else if contentType === 'document'}
       <div class="flex items-center gap-2">
         <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
           <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path>
         </svg>
         <span>{title || 'Document'}</span>
       </div>
     {/if}
     
     <slot />
   </div>
   ```
   
3. Create type-specific content item components ☑️
   ```svelte
   <!-- src/lib/components/ether/text-item.svelte -->
   <script lang="ts">
     export let content: string;
   </script>

   <div class="whitespace-pre-wrap">
     {content}
   </div>
   ```
   
   ```svelte
   <!-- src/lib/components/ether/link-item.svelte -->
   <script lang="ts">
     export let url: string;
     export let title: string | undefined = undefined;
   </script>

   <a 
     href={url} 
     target="_blank" 
     rel="noopener noreferrer" 
     class="text-blue-600 hover:underline"
   >
     {title || url}
   </a>
   ```
   
   ```svelte
   <!-- src/lib/components/ether/image-item.svelte -->
   <script lang="ts">
     export let imageUrl: string;
     export let alt: string = 'Image';
     export let maxWidth: string = '100%';
   </script>

   <img 
     src={imageUrl} 
     {alt} 
     class="rounded shadow-sm" 
     style="max-width: {maxWidth};"
     loading="lazy"
   />
   ```
   
4. Merge feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/content-positioning -m "Merge feature/content-positioning: HTML5 Drag and Drop functionality"
   git push origin develop
   git branch -d feature/content-positioning
   git push origin --delete feature/content-positioning
   ```

### D.3. Step 8: Implement Content Items Components ☑️
1. Create specific content item components ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/content-type-components
   ```

2. Implement text content component ☑️
   ```svelte
   <!-- src/lib/components/ether/text-item.svelte -->
   <script lang="ts">
     export let content: string;
   </script>

   <div class="whitespace-pre-wrap">
     {content}
   </div>
   ```

3. Implement link content component ☑️
   ```svelte
   <!-- src/lib/components/ether/link-item.svelte -->
   <script lang="ts">
     export let url: string;
     export let title: string | undefined = undefined;
   </script>

   <a 
     href={url} 
     target="_blank" 
     rel="noopener noreferrer" 
     class="text-blue-600 hover:underline"
   >
     {title || url}
   </a>
   ```

4. Implement image content component ☑️
   ```svelte
   <!-- src/lib/components/ether/image-item.svelte -->
   <script lang="ts">
     export let imageUrl: string;
     export let alt: string = 'Image';
     export let maxWidth: string = '100%';
   </script>

   <img 
     src={imageUrl} 
     {alt} 
     class="rounded shadow-sm" 
     style="max-width: {maxWidth};"
     loading="lazy"
   />
   ```

5. Implement speed-dial component for adding new content ☑️
   ```svelte
   <!-- src/lib/components/ether/speed-dial.svelte -->
   <script lang="ts">
     import { createEventDispatcher } from 'svelte';
     
     // Props
     export let position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left' = 'bottom-right';
     
     // State
     let isOpen = false;
     
     // Event handling
     const dispatch = createEventDispatcher();
     
     function toggleOpen() {
       isOpen = !isOpen;
     }
     
     function handleAction(action: string) {
       dispatch('action', { type: action });
       isOpen = false;
     }
     
     // Position classes
     const positionClasses = {
       'top-right': 'top-4 right-4',
       'bottom-right': 'bottom-4 right-4',
       'top-left': 'top-4 left-4',
       'bottom-left': 'bottom-4 left-4'
     };
   </script>

   <div class="fixed {positionClasses[position]} z-10">
     <!-- Main button -->
     <button
       class="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
       on:click={toggleOpen}
       aria-label={isOpen ? 'Close menu' : 'Open menu'}
     >
       {#if isOpen}
         <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
         </svg>
       {:else}
         <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
         </svg>
       {/if}
     </button>
     
     <!-- Menu items -->
     {#if isOpen}
       <div class="flex flex-col-reverse gap-2 mt-2 mb-2 transition-all">
         <!-- Text note -->
         <button
           class="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-transform transform hover:scale-110"
           on:click={() => handleAction('text')}
           aria-label="Add text note"
         >
           <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
           </svg>
         </button>
         
         <!-- Link -->
         <button
           class="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-transform transform hover:scale-110"
           on:click={() => handleAction('link')}
           aria-label="Add link"
         >
           <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
           </svg>
         </button>
         
         <!-- Image -->
         <button
           class="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-transform transform hover:scale-110"
           on:click={() => handleAction('image')}
           aria-label="Add image"
         >
           <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
           </svg>
         </button>
         
         <!-- Document -->
         <button
           class="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-transform transform hover:scale-110"
           on:click={() => handleAction('document')}
           aria-label="Add document"
         >
           <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
           </svg>
         </button>
       </div>
     {/if}
   </div>
   ```

6. Add the speed-dial component to the Ether Space ☑️
   ```svelte
   <!-- Update src/routes/app/[spaceId]/+page.svelte -->
   <script lang="ts">
     import EtherSpace from '$lib/components/ether/ether-space.svelte';
     import ContentItem from '$lib/components/ether/content-item.svelte';
     import SpeedDial from '$lib/components/ether/speed-dial.svelte';
     // ... existing imports ...
     
     // ... existing code ...
     
     function handleSpeedDialAction(event: CustomEvent) {
       const { type } = event.detail;
       console.log('Speed dial action:', type);
       
       // In a real app, this would open a modal to add content
       // and then add the content to the items array
     }
   </script>

   <div class="w-full h-[80vh]">
     <!-- ... existing code ... -->
     
     <div class="w-full h-full border border-gray-200 rounded-lg overflow-hidden bg-gray-50 relative">
       <EtherSpace {spaceId} {items}>
         <!-- ... existing content ... -->
       </EtherSpace>
       
       <SpeedDial position="bottom-right" on:action={handleSpeedDialAction} />
     </div>
   </div>
   ```

7. Merge feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/content-type-components -m "Merge feature/content-type-components: Different content type components"
   git push origin develop
   git branch -d feature/content-type-components
   git push origin --delete feature/content-type-components
   ```

### D.4. Step 9: UI Styling and Theme Customization ☑️
1. Create feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/ui-theme
   ```
   
2. Create Tailwind CSS theme variables ☑️
   ```css
   /* src/app.css */
   @import "tailwindcss";

   /* Custom global styles */
   body {
     font-family: 'Inter', system-ui, -apple-system, sans-serif;
   }

   html, body {
     height: 100%;
   }

   :root {
     --color-primary-600: oklch(0.546 0.245 262.881);
     --color-primary-700: oklch(0.488 0.243 264.376);
     --color-white: #fff;
     --color-focus: oklch(0.623 0.214 259.815);
   }

   /* Component styles */
   .fade-in {
     opacity: 0;
     transition: opacity 0.3s ease-out;
   }
   ```
   
3. Update app.html with theme attribute ☑️
   ```html
   <!doctype html>
   <html lang="en">
     <head>
       <meta charset="utf-8" />
       <link rel="icon" href="%sveltekit.assets%/favicon.png" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       %sveltekit.head%
     </head>
     <body data-theme="ether-theme" data-sveltekit-preload-data="hover">
       <div style="display: contents">%sveltekit.body%</div>
     </body>
   </html>
   ```
   
4. Set up PostCSS for Tailwind CSS v4 ☑️
   ```javascript
   // postcss.config.js
   export default {
     plugins: {
       autoprefixer: {},
       '@tailwindcss/postcss': {},
     },
   };
   ```
   
5. Merge feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/ui-theme -m "Merge feature/ui-theme: Tailwind CSS theme customization"
   git push origin develop
   git branch -d feature/ui-theme
   git push origin --delete feature/ui-theme
   ```

## E. Phase 3: Testing and Refinement (Week 3-4) ☑️

### E.1. Step 10: Testing Component Integration ☑️
1. Create unit tests for components ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/component-tests
   ```
   
2. Set up Vitest and testing library ☑️
   ```bash
   npm install -D vitest @testing-library/svelte @testing-library/jest-dom jsdom
   ```
   
3. Create test configuration ☑️
   ```typescript
   // vitest.config.ts
   import { defineConfig } from 'vitest/config';
   import { svelte } from '@sveltejs/vite-plugin-svelte';

   export default defineConfig({
     plugins: [svelte({ hot: !process.env.VITEST })],
     test: {
       include: ['src/**/*.{test,spec}.{js,ts}'],
       environment: 'jsdom',
       globals: true
     }
   });
   ```
   
4. Create sample test for Button component ☑️
   ```typescript
   // src/lib/components/ui/button.test.ts
   import { render, fireEvent } from '@testing-library/svelte';
   import { describe, it, expect, vi } from 'vitest';
   import Button from './button.svelte';

   describe('Button Component', () => {
     it('renders with default props', () => {
       const { getByRole } = render(Button, { props: { label: 'Click me' } });
       const button = getByRole('button');
       
       expect(button).toBeInTheDocument();
       expect(button).toHaveTextContent('Click me');
       expect(button).toHaveAttribute('type', 'button');
       expect(button.classList.contains('bg-blue-600')).toBe(true);
     });
     
     it('applies variants correctly', () => {
       const { getByRole, rerender } = render(Button, { 
         props: { label: 'Primary', variant: 'primary' } 
       });
       
       let button = getByRole('button');
       expect(button.classList.contains('bg-blue-600')).toBe(true);
       
       rerender({ label: 'Secondary', variant: 'secondary' });
       button = getByRole('button');
       expect(button.classList.contains('bg-gray-200')).toBe(true);
       
       rerender({ label: 'Ghost', variant: 'ghost' });
       button = getByRole('button');
       expect(button.classList.contains('bg-transparent')).toBe(true);
     });
     
     it('handles click events', async () => {
       const handleClick = vi.fn();
       const { getByRole } = render(Button, {
         props: { label: 'Click me' }
       });
       
       const button = getByRole('button');
       button.addEventListener('click', handleClick);
       
       await fireEvent.click(button);
       expect(handleClick).toHaveBeenCalledTimes(1);
     });
     
     it('disables the button when disabled is true', () => {
       const { getByRole } = render(Button, {
         props: { label: 'Disabled', disabled: true }
       });
       
       const button = getByRole('button');
       expect(button).toBeDisabled();
       expect(button.classList.contains('opacity-50')).toBe(true);
     });
   });
   ```
   
5. Add test script to package.json ☑️
   ```json
   {
     "scripts": {
       "test": "vitest run",
       "test:watch": "vitest"
     }
   }
   ```
   
6. Merge feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/component-tests -m "Merge feature/component-tests: Unit tests for components"
   git push origin develop
   git branch -d feature/component-tests
   git push origin --delete feature/component-tests
   ```

### E.2. Step 11: Database Setup and Integration ☑️
1. Create feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/database-setup
   ```
   
2. Configure Drizzle ORM ☑️
   ```typescript
   // drizzle.config.ts
   import { defineConfig } from 'drizzle-kit';

   export default defineConfig({
     schema: './src/lib/server/db/schema.ts',
     out: './migrations',
     dialect: 'sqlite',
     dbCredentials: {
       url: './data/sqlite.db'
     }
   });
   ```
   
3. Generate and run migrations ☑️
   ```bash
   npx drizzle-kit generate
   ```
   
4. Create database connection script ☑️
   ```typescript
   // src/lib/server/db/db.ts
   import { drizzle } from 'drizzle-orm/better-sqlite3';
   import Database from 'better-sqlite3';
   import * as schema from './schema';

   // Create a SQLite database connection
   const sqlite = new Database('./data/sqlite.db');
   export const db = drizzle(sqlite, { schema });

   // Export the schema for use in type definitions
   export * from './schema';
   ```
   
5. Create migration utility ☑️
   ```typescript
   // src/lib/server/db/migrate.ts
   import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
   import { drizzle } from 'drizzle-orm/better-sqlite3';
   import Database from 'better-sqlite3';
   import * as path from 'path';
   import * as fs from 'fs';

   // Ensure the data directory exists
   const dataDir = path.join(process.cwd(), 'data');
   if (!fs.existsSync(dataDir)) {
     fs.mkdirSync(dataDir, { recursive: true });
   }

   // Connect to the database and run migrations
   const sqlite = new Database('./data/sqlite.db');
   const db = drizzle(sqlite);

   console.log('Running migrations...');
   migrate(db, { migrationsFolder: './migrations' });
   console.log('Migrations completed successfully!');
   ```
   
6. Run migrations to set up the database ☑️
   ```bash
   npx tsx src/lib/server/db/migrate.ts
   ```
   
7. Merge feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/database-setup -m "Merge feature/database-setup: SQLite database with Drizzle ORM"
   git push origin develop
   git branch -d feature/database-setup
   git push origin --delete feature/database-setup
   ```
   
### E.3. Step 12: Testing and Debugging ☑️
1. Create feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/testing-debugging
   ```
   
2. Add debugging configuration ☑️
   ```json
   // .vscode/launch.json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "chrome",
         "request": "launch",
         "name": "Launch Chrome against localhost",
         "url": "http://localhost:5173",
         "webRoot": "${workspaceFolder}"
       },
       {
         "type": "node",
         "request": "launch",
         "name": "Debug SvelteKit server",
         "program": "${workspaceFolder}/node_modules/@sveltejs/kit/src/cli.js",
         "args": ["dev"],
         "cwd": "${workspaceFolder}",
         "console": "integratedTerminal"
       }
     ]
   }
   ```
   
3. Add error logging middleware ☑️
   ```typescript
   // src/hooks.server.ts
   // ...existing code...
   
   export const handleError = ({ error, event }) => {
     console.error(`Error during request ${event.url.pathname}:`, error);
     
     // For development only, log more details
     if (process.env['NODE_ENV'] !== 'production') {
       console.error('Stack trace:', error.stack);
       console.error('Request details:', {
         method: event.request.method,
         url: event.url.toString(),
         headers: Object.fromEntries(event.request.headers)
       });
     }
     
     return {
       message: 'An unexpected error occurred',
       code: error.code || 'UNKNOWN'
     };
   };
   ```
   
4. Merge feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/testing-debugging -m "Merge feature/testing-debugging: Added debugging configuration"
   git push origin develop
   git branch -d feature/testing-debugging
   git push origin --delete feature/testing-debugging
   ```

## F. Phase 4: WebSocket Integration and Real-time Updates ☑️

### F.1. Step 13: WebSocket Integration with Socket.io ☑️
1. Create feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/websocket-integration
   ```
   
2. Install Socket.io ☑️
   ```bash
   npm install socket.io socket.io-client
   ```
   
3. Create socket server setup ☑️
   ```typescript
   // src/lib/server/socket.ts
   import { Server } from 'socket.io';
   import type { Server as HTTPServer } from 'http';
   import type { EtherContentPosition } from '$lib/types/ether-content';
   
   export function setupSocketServer(server: HTTPServer) {
     const io = new Server(server);
     
     io.on('connection', (socket) => {
       console.log('Client connected:', socket.id);
       
       // Handle joining a space
       socket.on('space:join', (data: { spaceId: string, user: any }) => {
         const { spaceId, user } = data;
         
         // Join the space's room
         socket.join(`space:${spaceId}`);
         
         // Notify others in the space
         socket.to(`space:${spaceId}`).emit('user:joined', {
           userId: user.id,
           username: user.name,
           socketId: socket.id
         });
         
         console.log(`User ${user.name} joined space ${spaceId}`);
       });
       
       // Handle leaving a space
       socket.on('space:leave', (data: { spaceId: string }) => {
         const { spaceId } = data;
         
         // Leave the space's room
         socket.leave(`space:${spaceId}`);
         
         // Notify others (the client would need to also send user info here in a real app)
         socket.to(`space:${spaceId}`).emit('user:left', {
           socketId: socket.id
         });
       });
       
       // Handle content movement
       socket.on('content:move', (data: { 
         spaceId: string, 
         contentId: string, 
         position: EtherContentPosition 
       }) => {
         const { spaceId, contentId, position } = data;
         
         // Broadcast to others in the space
         socket.to(`space:${spaceId}`).emit('content:moved', {
           contentId,
           position
         });
       });
       
       // Handle new content
       socket.on('content:add', (data: { spaceId: string, content: any }) => {
         const { spaceId, content } = data;
         
         // Broadcast to others in the space
         socket.to(`space:${spaceId}`).emit('content:added', {
           content
         });
       });
       
       // Handle disconnection
       socket.on('disconnect', () => {
         console.log('Client disconnected:', socket.id);
       });
     });
     
     return io;
   }
   ```
   
4. Create client-side socket connection utility ☑️
   ```typescript
   // src/lib/socket-client.ts
   import { io } from 'socket.io-client';
   import { browser } from '$app/environment';
   
   let socket: any = null;
   
   export function initSocket() {
     if (!browser) return null;
     
     if (!socket) {
       // Connect to the server
       const url = import.meta.env.VITE_SOCKET_URL || '';
       socket = io(url, {
         transports: ['websocket'],
         autoConnect: true
       });
       
       // Setup event listeners
       socket.on('connect', () => {
         console.log('Connected to socket server', socket.id);
       });
       
       socket.on('disconnect', () => {
         console.log('Disconnected from socket server');
       });
       
       socket.on('error', (error: any) => {
         console.error('Socket error:', error);
       });
     }
     
     return socket;
   }
   
   export function getSocket() {
     return socket;
   }
   
   export function disconnectSocket() {
     if (socket) {
       socket.disconnect();
       socket = null;
     }
   }
   ```
   
5. Integrate with server hooks ☑️
   ```typescript
   // src/hooks.server.ts
   import { setupSocketServer } from '$lib/server/socket';
   import type { Handle } from '@sveltejs/kit';
   
   export const handle: Handle = async ({ event, resolve }) => {
     // ... existing authentication code ...
     
     const response = await resolve(event);
     return response;
   };
   
   // Attach Socket.io to the server
   if (import.meta.env.PROD) {
     // Only in production, as dev server works differently
     const { server } = await import('$app/server');
     setupSocketServer(server);
   }
   ```
   
6. Update EtherSpace component for real-time updates ☑️
   
7. Merge feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/websocket-integration -m "Merge feature/websocket-integration: Real-time updates with Socket.io"
   git push origin develop
   git branch -d feature/websocket-integration
   git push origin --delete feature/websocket-integration
   ```

### F.2. Step 14: Tailwind CSS v4 Vite Plugin Integration ☑️
1. Create feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git checkout -b feature/tailwind-vite-plugin
   ```
   
2. Install the Tailwind CSS v4 Vite plugin ☑️
   ```bash
   npm install @tailwindcss/vite -D
   ```
   
3. Update the Vite configuration ☑️
   ```javascript
   // vite.config.js
   import { defineConfig } from 'vite';
   import { sveltekit } from '@sveltejs/kit/vite';
   import tailwindcss from '@tailwindcss/vite';
   
   export default defineConfig({
     plugins: [
       tailwindcss(),
       sveltekit()
     ],
     // ... rest of configuration
   });
   ```
   
4. Remove PostCSS plugin configuration ☑️
   ```javascript
   // postcss.config.js
   export default {
     plugins: {
       autoprefixer: {},
     },
   };
   ```
   
5. Fix component styling ☑️
   ```svelte
   <!-- src/lib/components/ether/ether-space.svelte -->
   <!-- ... existing code ... -->
   
   <style>
     .ether-space {
       position: relative;
       width: 100%;
       height: 100%;
       overflow: hidden;
       background-color: var(--color-background-alt);
       background-image: 
         linear-gradient(rgba(150, 150, 150, 0.1) 1px, transparent 1px),
         linear-gradient(90deg, rgba(150, 150, 150, 0.1) 1px, transparent 1px);
       background-size: 20px 20px;
     }
     
     /* ... rest of styles ... */
   </style>
   ```
   
6. Confirm app.css uses the proper import syntax ☑️
   ```css
   /* src/app.css */
   @import "tailwindcss";
   
   /* Custom global styles */
   /* ... */
   ```
   
7. Merge feature branch ☑️
   ```bash
   git checkout develop
   git pull --rebase origin develop
   git merge --no-ff feature/tailwind-vite-plugin -m "Merge feature/tailwind-vite-plugin: Switch to Tailwind CSS v4 Vite plugin"
   git push origin develop
   git branch -d feature/tailwind-vite-plugin
   git push origin --delete feature/tailwind-vite-plugin
   ```

### F.3. Step 15: Keyboard Navigation Enhancement

// ... continue with implementation steps ...