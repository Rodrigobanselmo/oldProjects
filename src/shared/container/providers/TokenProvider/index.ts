import { container } from 'tsyringe';
import { JwtTokenProvider } from './implementations/JwtTokenProvider';
import ITokenProvider from './models/ITokenProvider';

container.registerSingleton<ITokenProvider>('TokenProvider', JwtTokenProvider);
