import { provider as stubProvider } from './providers/stub';

export async function createProjectProvider(type: string) {
  switch(type) {
    case 'stub':
      return stubProvider();
    default:
      throw new Error(`Unknown provider type: ${type}`);
  }
}