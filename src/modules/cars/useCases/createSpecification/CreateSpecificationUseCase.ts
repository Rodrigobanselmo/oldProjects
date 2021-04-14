import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const hasCategory = await this.specificationsRepository.findByName(name);

    if (hasCategory) {
      throw new AppError('This specification already exists');
    }

    const category = this.specificationsRepository.create({
      name,
      description,
    });

    return category;
  }
}

export { CreateSpecificationUseCase };
