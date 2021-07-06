"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayJSProvider = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

class DayJSProvider {
  addHours(date, hours) {
    return (0, _dayjs.default)(date).add(hours, 'hours').toDate();
  }

  addDay(date, days) {
    return (0, _dayjs.default)(date).add(days, 'days').toDate();
  }

  compareIfBefore(start_date, end_date) {
    return (0, _dayjs.default)(start_date).isBefore(end_date);
  }

  compareInHours(start_date, end_date) {
    const endDateFormat = this.convertToUTC(end_date);
    const startDateFormat = this.convertToUTC(start_date);
    return (0, _dayjs.default)(endDateFormat).diff(startDateFormat, 'hours');
  }

  compareInDays(start_date, end_date) {
    const endDateFormat = this.convertToUTC(end_date);
    const startDateFormat = this.convertToUTC(start_date);
    return (0, _dayjs.default)(endDateFormat).diff(startDateFormat, 'days');
  }

  convertToUTC(date) {
    return (0, _dayjs.default)(date).utc().local().format();
  }

  dateNow() {
    return (0, _dayjs.default)().toDate();
  }

}

exports.DayJSProvider = DayJSProvider;