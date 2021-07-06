"use strict";

var _FakeCarsRepository = require("../../../cars/repositories/fakes/FakeCarsRepository");

var _FakeDateProvider = require("../../../../shared/container/providers/DateProvider/fakes/FakeDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _FakeRentalsRepository = require("../../repositories/fakes/FakeRentalsRepository");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let fakeCarsRepository;
let fakeRentalsRepository;
let fakeDateProvider;
describe('CreateRentals', () => {
  beforeEach(() => {
    fakeCarsRepository = new _FakeCarsRepository.FakeCarsRepository();
    fakeRentalsRepository = new _FakeRentalsRepository.FakeRentalsRepository();
    fakeDateProvider = new _FakeDateProvider.FakeDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(fakeCarsRepository, fakeRentalsRepository, fakeDateProvider);
  });
  it('Should be able to create a new rental', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      category_id: 'category-id',
      daily_rate: 40,
      description: 'description',
      fine_amount: 60,
      license_plate: 'nnr1234',
      name: 'Car'
    });
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      return_date: (0, _dayjs.default)().add(25, 'hours').toDate(),
      user_id: 'qwe123'
    });
    const updatedCar = await fakeCarsRepository.findById(car.id);
    expect(rental).toHaveProperty('id');
    expect(updatedCar === null || updatedCar === void 0 ? void 0 : updatedCar.available).toEqual(false);
  });
  it('Should not be able to create a new rental with non-car', async () => {
    await expect(createRentalUseCase.execute({
      car_id: 'non-car-id',
      return_date: (0, _dayjs.default)().add(25, 'hours').toDate(),
      user_id: 'qwe123'
    })).rejects.toEqual(new _AppError.AppError('This car not exists'));
  });
  it('Should not be able to create a new rental when car is unavailable', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      category_id: 'category-id',
      daily_rate: 40,
      description: 'description',
      fine_amount: 60,
      license_plate: 'nnr1234',
      name: 'Car'
    });
    await createRentalUseCase.execute({
      car_id: car.id,
      return_date: (0, _dayjs.default)().add(25, 'hours').toDate(),
      user_id: 'qwe123'
    });
    await expect(createRentalUseCase.execute({
      car_id: car.id,
      return_date: (0, _dayjs.default)().add(25, 'hours').toDate(),
      user_id: 'qwe1234'
    })).rejects.toEqual(new _AppError.AppError('This car is unavailable'));
  });
  it('Should not be able to create a new rental with pending rental', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      category_id: 'category-id',
      daily_rate: 40,
      description: 'description',
      fine_amount: 60,
      license_plate: 'nnr1234',
      name: 'Car'
    });
    const car2 = await fakeCarsRepository.create({
      brand: 'Brand2',
      category_id: 'category-id',
      daily_rate: 40,
      description: 'description',
      fine_amount: 60,
      license_plate: 'nnr6547',
      name: 'Car'
    });
    await createRentalUseCase.execute({
      car_id: car.id,
      return_date: (0, _dayjs.default)().add(25, 'hours').toDate(),
      user_id: 'qwe123'
    });
    await expect(createRentalUseCase.execute({
      car_id: car2.id,
      return_date: (0, _dayjs.default)().add(25, 'hours').toDate(),
      user_id: 'qwe123'
    })).rejects.toEqual(new _AppError.AppError('There is a rental pending in your account'));
  });
  it('Should not be able to create a new rental with invalid date range', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      category_id: 'category-id',
      daily_rate: 40,
      description: 'description',
      fine_amount: 60,
      license_plate: 'nnr1234',
      name: 'Car'
    });
    await expect(createRentalUseCase.execute({
      car_id: car.id,
      return_date: new Date('2021-04-19 07:30'),
      user_id: 'qwe123'
    })).rejects.toEqual(new _AppError.AppError('Invalid return date'));
  });
});