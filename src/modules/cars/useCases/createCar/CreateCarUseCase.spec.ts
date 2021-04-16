import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeCategoriesRepository } from '@modules/cars/repositories/fakes/FakeCategoriesRepository';

import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let fakeCarsRepository: FakeCarsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;

describe('Create Car', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCarUseCase = new CreateCarUseCase(
      fakeCarsRepository,
      fakeCategoriesRepository,
    );
  });

  it('Should be able to create a new Car', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Category',
      description: 'Description',
    });

    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description car',
      daily_rate: 10,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: category.id,
    });

    expect(car).toHaveProperty('id');
    expect(car.available).toBe(true);
  });

  it('Should not be able to create a new Car with same license plate', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Category',
      description: 'Description',
    });

    await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description car',
      daily_rate: 10,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: category.id,
    });

    expect(async () => {
      await createCarUseCase.execute({
        name: 'Name Car',
        description: 'Description car',
        daily_rate: 10,
        license_plate: 'ABC1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: category.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new Car with invalid category_id', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Name Car',
        description: 'Description car',
        daily_rate: 10,
        license_plate: 'ABC1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'non-id',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
