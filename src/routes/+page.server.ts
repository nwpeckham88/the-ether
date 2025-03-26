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