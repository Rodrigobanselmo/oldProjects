import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: number,
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    categori_id,
  }: ICreateCarDTO): Promise<void> {
    console.log('1');
  }
}

export { CreateCarUseCase };
