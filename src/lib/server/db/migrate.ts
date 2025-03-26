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