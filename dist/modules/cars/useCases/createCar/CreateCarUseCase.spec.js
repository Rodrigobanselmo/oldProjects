"use strict";

var _FakeCarsRepository = require("../../repositories/fakes/FakeCarsRepository");

var _FakeCategoriesRepository = require("../../repositories/fakes/FakeCategoriesRepository");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let fakeCarsRepository;
let fakeCategoriesRepository;
describe('Create Car', () => {
  beforeEach(() => {
    fakeCarsRepository = new _FakeCarsRepository.FakeCarsRepository();
    fakeCategoriesRepository = new _FakeCategoriesRepository.FakeCategoriesRepository();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(fakeCarsRepository, fakeCategoriesRepository);
  });
  it('Should be able to create a new Car', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Category',
      description: 'Description'
    });
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description car',
      daily_rate: 10,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: category.id
    });
    expect(car).toHaveProperty('id');
    expect(car.available).toBe(true);
  });
  it('Should not be able to create a new Car with same license plate', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Category',
      description: 'Description'
    });
    await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description car',
      daily_rate: 10,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: category.id
    });
    await expect(createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description car',
      daily_rate: 10,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: category.id
    })).rejects.toEqual(new _AppError.AppError('This car already exists', 400));
  });
  it('Should not be able to create a new Car with invalid category_id', async () => {
    await expect(createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description car',
      daily_rate: 10,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'non-id'
    })).rejects.toEqual(new _AppError.AppError('Invalid Category', 400));
  });
});