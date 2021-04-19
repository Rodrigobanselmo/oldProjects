import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../models/IDateProvider';

dayjs.extend(utc);

class DayJSProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const endDateFormat = this.convertToUTC(end_date);
    const startDateFormat = this.convertToUTC(start_date);
    return dayjs(endDateFormat).diff(startDateFormat, 'hours');
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayJSProvider };
