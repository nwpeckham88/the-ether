import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Create a SQLite database connection
const sqlite = new Database('./data/sqlite.db');
export const db = drizzle(sqlite, { schema });

// Export the schema for use in type definitions
export * from './schema'; 