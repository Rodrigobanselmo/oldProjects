import { container } from 'tsyringe';
import { BCryptProvider } from './implementations/BCryptProvider';
import { IHashProvider } from './models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptProvider);
