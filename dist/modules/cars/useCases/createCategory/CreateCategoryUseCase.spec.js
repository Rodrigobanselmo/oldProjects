"use strict";

var _FakeCategoriesRepository = require("../../repositories/fakes/FakeCategoriesRepository");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

let createCategoryUseCase;
let fakeCategoriesRepository;
describe('Create Category', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new _FakeCategoriesRepository.FakeCategoriesRepository();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(fakeCategoriesRepository);
  });
  it('Should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Name',
      description: 'description'
    });
    expect(category).toHaveProperty('id');
  });
  it('Should not be able to create a new category with same name', async () => {
    await createCategoryUseCase.execute({
      name: 'Name',
      description: 'description'
    });
    await expect(createCategoryUseCase.execute({
      name: 'Name',
      description: 'description'
    })).rejects.toEqual(new _AppError.AppError('This category already exist'));
  });
});