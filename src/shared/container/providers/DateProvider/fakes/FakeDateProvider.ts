import { IDateProvider } from '../models/IDateProvider';

class FakeDateProvider implements IDateProvider {
  dateNow(): Date {
    return new Date();
  }
  compareInHours(start_date: Date, end_date: Date): number {
    const diff = end_date.getTime() - start_date.getTime();
    // console.log('diff', diff / (1000 * 3600));
    return diff / (1000 * 3600);
  }
  convertToUTC(date: Date): string {
    return date.toUTCString();
  }
}

export { FakeDateProvider };
