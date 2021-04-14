import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: number,
  ) {}
}

export { CreateCarUseCase };
