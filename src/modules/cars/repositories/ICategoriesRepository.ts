import { ICreateCategoryDTO } from '../dtos/CategoryDTO';
import { Category } from '../infra/typeorm/entities/Category';

interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
}

export { ICategoriesRepository };
