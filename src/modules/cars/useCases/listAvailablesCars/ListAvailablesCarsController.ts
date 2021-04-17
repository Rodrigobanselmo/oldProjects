import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailablesCarsUseCase } from './ListAvailablesCarsUseCase';

class ListAvailablesCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, name } = request.query;
    const listAvailablesCarsUsecase = container.resolve(
      ListAvailablesCarsUseCase,
    );

    const cars = await listAvailablesCarsUsecase.execute({
      brand: String(brand),
      category_id: String(category_id),
      name: String(name),
    });

    return response.json(cars);
  }
}

export { ListAvailablesCarsController };
