import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { createId } from '@paralleldrive/cuid2';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
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
      // Check if user exists
      const existingUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email)
      });
      
      if (existingUser) {
        return fail(400, { 
          error: 'User with this email already exists',
          email 
        });
      }
      
      // Hash password and create user
      const passwordHash = await import('$lib/server/auth').then(
        ({ hashPassword }) => hashPassword(password)
      );
      
      const userId = createId();
      
      await db.insert(users).values({
        id: userId,
        email,
        passwordHash,
        emailVerified: false,
        isActive: true,
        createdAt: new Date()
      });
      
      // Redirect to login
      throw redirect(303, '/login?registered=true');
    } catch (error) {
      console.error('Registration error:', error);
      return fail(500, { 
        error: 'An unexpected error occurred',
        email 
      });
    }
  }
}; 