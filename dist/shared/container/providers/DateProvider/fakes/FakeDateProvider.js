"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeDateProvider = void 0;

class FakeDateProvider {
  addHours(date, hours) {
    const dateTime = date.getTime();
    return new Date(dateTime + 1000 * 3600 * hours);
  }

  addDay(date, days) {
    const dateTime = date.getTime();
    return new Date(dateTime + 1000 * 3600 * 24 * days);
  }

  compareIfBefore(start_date, end_date) {
    return end_date.getTime() < start_date.getTime();
  }

  dateNow() {
    return new Date();
  }

  compareInHours(start_date, end_date) {
    const diff = end_date.getTime() - start_date.getTime();
    return diff / (1000 * 3600);
  }

  convertToUTC(date) {
    return date.toUTCString();
  }

  compareInDays(start_date, end_date) {
    const diff = end_date.getTime() - start_date.getTime();
    return diff / (1000 * 3600 * 24);
  }

}

exports.FakeDateProvider = FakeDateProvider;