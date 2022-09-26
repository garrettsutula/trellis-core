import { provider as stubProvider } from './providers/stub';

export async function getWorkspaceProvider(type: string) {
  switch(type) {
    case 'stub':
      return stubProvider();
    default:
      throw new Error(`Unknown provider type: ${type}`);
  }
}