import { error } from '@sveltejs/kit';

// Define PageServerLoad type manually until SvelteKit generates it
interface PageServerLoad {
  (input: { params: { spaceId: string } }): Promise<{ spaceId: string }>;
}

export const load: PageServerLoad = async ({ params }: { params: { spaceId: string } }) => {
  const { spaceId } = params;
  
  if (!spaceId) {
    throw error(404, 'Space not found');
  }
  
  // In a real implementation, we would fetch the space data from the database
  // and check if the current user has access to it
  
  return {
    spaceId
  };
}; 