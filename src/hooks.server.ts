import { auth } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Attach auth to the event
  event.locals.auth = auth;
  event.locals.session = null;
  event.locals.user = null;
  
  // Get session cookie
  const sessionId = event.cookies.get('session');
  
  if (sessionId) {
    try {
      // Validate session
      const session = await auth.validateSession(sessionId);
      
      if (session) {
        // Set user and session in locals
        event.locals.session = {
          id: session.id,
          userId: session.userId,
          expiresAt: session.expiresAt
        };
        
        event.locals.user = {
          id: session.user.id,
          email: session.user.email,
          emailVerified: session.user.emailVerified || false,
          isActive: session.user.isActive || false
        };
      }
    } catch (error) {
      console.error('Session validation error:', error);
    }
  }
  
  // Resolve the request
  return await resolve(event);
}; 