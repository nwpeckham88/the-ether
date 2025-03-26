import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { createId } from '@paralleldrive/cuid2';
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
      
      // Verify password using argon2
      const passwordValid = await import('$lib/server/auth').then(
        ({ verifyPassword }) => verifyPassword(user.passwordHash, password)
      );
      
      if (!passwordValid) {
        return fail(400, { 
          error: 'Invalid email or password',
          email 
        });
      }
      
      // Create new session
      const sessionId = createId();
      const expires = new Date();
      expires.setDate(expires.getDate() + 7); // 1 week
      
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