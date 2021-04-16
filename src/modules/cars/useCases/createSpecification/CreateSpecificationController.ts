import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      const createSpecificationUseCase = container.resolve(
        CreateSpecificationUseCase,
      );

      const specification = await createSpecificationUseCase.execute({
        name,
        description,
      });
      console.log('entrou no erro 1');
      return response.status(201).json(specification);
    } catch (err) {
      console.log('entrou no erro catch');
      return response.json({ error: err.message });
    }
  }
}

export { CreateSpecificationController };
