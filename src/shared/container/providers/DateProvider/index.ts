import { container } from 'tsyringe';

import { DayJSProvider } from './implementations/DayJSProvider';
import { IDateProvider } from './models/IDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayJSProvider);
