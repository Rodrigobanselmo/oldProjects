"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalUseCase = void 0;

var _ICarsRepository = require("../../../cars/repositories/ICarsRepository");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/models/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

var _tsyringe = require("tsyringe");

var _IRentalsRepository = require("../../repositories/IRentalsRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

let CreateRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('RentalsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateRentalUseCase {
  constructor(carsRepository, rentalsRepository, dateProvider) {
    this.carsRepository = carsRepository;
    this.rentalsRepository = rentalsRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    car_id,
    user_id,
    return_date
  }) {
    const minimumHour = 24; // não deve ser possível resevar um carro inexiste

    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new _AppError.AppError('This car not exists');
    } // não deve ser possível cadastrar um novo aluguel
    // caso já exista um aberto para o mesmo carro


    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new _AppError.AppError('This car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new _AppError.AppError('There is a rental pending in your account');
    } // a data de retorno não pode ser anterior a data de reserva


    const dateNow = this.dateProvider.dateNow();
    const diffHours = this.dateProvider.compareInHours(dateNow, return_date);

    if (diffHours < minimumHour) {
      throw new _AppError.AppError('Invalid return date');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      return_date,
      total: diffHours / 24 * car.daily_rate,
      user_id
    });
    await this.carsRepository.updateAvailable(car_id, false);
    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateRentalUseCase = CreateRentalUseCase;