import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../infra/typeorm/entities/Specification';

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification | undefined>;
}

export { ISpecificationsRepository };
