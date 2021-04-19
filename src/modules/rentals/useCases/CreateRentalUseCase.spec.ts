import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

import { FakeDateProvider } from '@shared/container/providers/DateProvider/fakes/FakeDateProvider';
import { AppError } from '@shared/errors/AppError';

import { FakeRentalsRepository } from '../repositories/fakes/FakeRentalsRepository';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let fakeCarsRepository: FakeCarsRepository;
let fakeRentalsRepository: FakeRentalsRepository;
let fakeDateProvider: FakeDateProvider;

describe('CreateRentals', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeRentalsRepository = new FakeRentalsRepository();
    fakeDateProvider = new FakeDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      fakeCarsRepository,
      fakeRentalsRepository,
      fakeDateProvider,
    );
  });

  it('Should be able to create a new rental', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      category_id: 'category-id',
      daily_rate: 40,
      description: 'description',
      fine_amount: 60,
      license_plate: 'nnr1234',
      name: 'Car',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      return_date: new Date('2021-04-24'),
      user_id: 'qwe123',
    });

    expect(rental).toHaveProperty('id');
  });

  it('Should not be able to create a new rental with non-car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'non-car-id',
        return_date: new Date('2021-04-24'),
        user_id: 'qwe123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental when car is unavailable', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      category_id: 'category-id',
      daily_rate: 40,
      description: 'description',
      fine_amount: 60,
      license_plate: 'nnr1234',
      name: 'Car',
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      return_date: new Date('2021-04-24'),
      user_id: 'qwe123',
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: car.id,
        return_date: new Date('2021-04-24'),
        user_id: 'qwe1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental with pending rental', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      category_id: 'category-id',
      daily_rate: 40,
      description: 'description',
      fine_amount: 60,
      license_plate: 'nnr1234',
      name: 'Car',
    });

    const car2 = await fakeCarsRepository.create({
      brand: 'Brand2',
      category_id: 'category-id',
      daily_rate: 40,
      description: 'description',
      fine_amount: 60,
      license_plate: 'nnr6547',
      name: 'Car',
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      return_date: new Date('2021-04-24'),
      user_id: 'qwe123',
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: car2.id,
        return_date: new Date('2021-04-24'),
        user_id: 'qwe123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new rental with invalid date range', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Brand',
      category_id: 'category-id',
      daily_rate: 40,
      description: 'description',
      fine_amount: 60,
      license_plate: 'nnr1234',
      name: 'Car',
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: car.id,
        return_date: new Date('2021-04-19 07:30'),
        user_id: 'qwe123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
