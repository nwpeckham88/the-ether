import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
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