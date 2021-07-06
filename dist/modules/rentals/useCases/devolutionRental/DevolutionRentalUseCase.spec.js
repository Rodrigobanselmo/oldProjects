"use strict";

var _FakeCarsRepository = require("../../../cars/repositories/fakes/FakeCarsRepository");

var _FakeRentalsRepository = require("../../repositories/fakes/FakeRentalsRepository");

var _DayJSProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayJSProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _DevolutionRentalUseCase = require("./DevolutionRentalUseCase");

let fakeRentalsRepository;
let fakeCarsRepository;
let dateProvider;
let devolutionRentalUseCase;
describe('DevolutionRental', () => {
  beforeEach(() => {
    fakeRentalsRepository = new _FakeRentalsRepository.FakeRentalsRepository();
    fakeCarsRepository = new _FakeCarsRepository.FakeCarsRepository();
    dateProvider = new _DayJSProvider.DayJSProvider();
    devolutionRentalUseCase = new _DevolutionRentalUseCase.DevolutionRentalUseCase(fakeRentalsRepository, fakeCarsRepository, dateProvider);
  });
  it('Should be able to make a rent return', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 20,
      description: 'Description',
      fine_amount: 40,
      license_plate: 'Licence',
      name: 'Car'
    });
    const rental = await fakeRentalsRepository.create({
      car_id: car.id,
      return_date: dateProvider.addDay(dateProvider.dateNow(), 1),
      total: 60,
      user_id: 'user_id'
    });
    const updatedRental = await devolutionRentalUseCase.execute({
      id: rental.id
    });
    expect(updatedRental).toHaveProperty('id');
  });
  it('Should not be able to make a rent return with invalid rental', async () => {
    expect(async () => {
      await devolutionRentalUseCase.execute({
        id: 'invalid-id'
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
});