import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    createCarUseCase = new CreateCarUseCase(2);
  });

  it('Shuold be able to create a new Car', async () => {
    await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description car',
      daily_rate: 10,
      license_plate: 'ABC1234',
      fine_amount: 60,
      brand: 'Brand',
      categori_id: 'category',
    });
  });
});
