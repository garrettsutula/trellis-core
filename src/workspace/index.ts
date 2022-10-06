import { provider as stubProvider } from './providers/stub';
import { provider as fileProvider} from './providers/file';

export async function getWorkspaceProvider(type: string, opts?: {[key: string]: any}) {
  switch(type) {
    case 'stub':
      return stubProvider();
    case 'file':
      return fileProvider(opts.baseFilePath || process.cwd());
    default:
      throw new Error(`Unknown provider type: ${type}`);
  }
}