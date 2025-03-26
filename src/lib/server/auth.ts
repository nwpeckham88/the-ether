import { createId } from '@paralleldrive/cuid2';
import { db } from './db';
import { users, sessions } from './db/schema';
import { eq } from 'drizzle-orm';
import { dev } from '$app/environment';
import crypto from 'crypto';

// Type definitions for our custom auth system
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
  lastLogin: Date | null;
  isActive: boolean;
  createdAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  userAgent?: string;
  expiresAt: Date;
  createdAt: Date;
}

// Password utilities
export const hashPassword = async (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Generate a salt
    const salt = crypto.randomBytes(16).toString('hex');
    
    // Use PBKDF2 for password hashing (more compatible than argon2 in some environments)
    crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      // Format: algorithm:iterations:salt:hash
      resolve(`pbkdf2:1000:${salt}:${derivedKey.toString('hex')}`);
    });
  });
};

export const verifyPassword = async (storedHash: string, password: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      // Parse the stored hash string
      const [algorithm, iterations, salt, hash] = storedHash.split(':');
      const iterCount = parseInt(iterations, 10);
      
      if (algorithm !== 'pbkdf2') {
        return resolve(false);
      }
      
      // Hash the input password with the same salt and iterations
      crypto.pbkdf2(password, salt, iterCount, 64, 'sha512', (err, derivedKey) => {
        if (err) reject(err);
        // Compare the derived key with the stored hash
        resolve(derivedKey.toString('hex') === hash);
      });
    } catch (e) {
      reject(e);
    }
  });
};

// User functions
export const findUserById = async (id: string): Promise<User | undefined> => {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id)
  });
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email)
  });
};

export const createUser = async (email: string, password: string): Promise<User> => {
  const id = createId();
  const passwordHash = await hashPassword(password);
  
  await db.insert(users).values({
    id,
    email,
    passwordHash,
    emailVerified: false,
    isActive: true,
    createdAt: new Date()
  });
  
  const user = await findUserById(id);
  return user as User;
};

// Session functions
export const createSession = async (userId: string, userAgent?: string): Promise<Session> => {
  const id = createId();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 1 week
  
  await db.insert(sessions).values({
    id,
    userId,
    userAgent,
    expiresAt,
    createdAt: new Date()
  });
  
  return {
    id,
    userId,
    userAgent,
    expiresAt,
    createdAt: new Date()
  };
};

export const findSessionById = async (id: string): Promise<Session | undefined> => {
  return await db.query.sessions.findFirst({
    where: (sessions, { eq }) => eq(sessions.id, id)
  });
};

export const deleteSession = async (id: string): Promise<void> => {
  await db.delete(sessions).where(eq(sessions.id, id));
};

// Fake BetterAuth API for compatibility with existing code
export const auth = {
  // Core auth functions
  validateSession: async (sessionId?: string) => {
    if (!sessionId) return null;
    
    const session = await findSessionById(sessionId);
    
    if (!session || new Date() > session.expiresAt) {
      if (session) await deleteSession(session.id);
      return null;
    }
    
    const user = await findUserById(session.userId);
    if (!user) {
      await deleteSession(session.id);
      return null;
    }
    
    return { ...session, user };
  },
  
  // Auth handlers (compatible with SvelteKit actions)
  handler: {
    async signIn(request) {
      // Implementation will come later in the route handlers
      return new Response();
    },
    async signUp(request) {
      // Implementation will come later in the route handlers
      return new Response();
    }
  }
}; 