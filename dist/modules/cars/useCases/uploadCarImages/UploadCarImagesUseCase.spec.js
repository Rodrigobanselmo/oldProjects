"use strict";

var _FakeCarImagesRepository = require("../../repositories/fakes/FakeCarImagesRepository");

var _FakeCarsRepository = require("../../repositories/fakes/FakeCarsRepository");

var _AppError = require("../../../../shared/errors/AppError");

var _UploadCarImagesUseCase = require("./UploadCarImagesUseCase");

let uploadImageCarUseCase;
let fakeCarsRepository;
let fakeCarImagesRepository;
describe('UploadCarImage', () => {
  beforeEach(() => {
    fakeCarsRepository = new _FakeCarsRepository.FakeCarsRepository();
    fakeCarImagesRepository = new _FakeCarImagesRepository.FakeCarImagesRepository();
    uploadImageCarUseCase = new _UploadCarImagesUseCase.UploadCarImagesUseCase(fakeCarsRepository, fakeCarImagesRepository);
  });
  it('Should be able to upload image to car', async () => {
    const car = await fakeCarsRepository.create({
      name: 'Name',
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 20,
      description: 'description',
      fine_amount: 60,
      license_plate: 'asd1234'
    });
    const images = await uploadImageCarUseCase.execute({
      car_id: car.id,
      images_name: ['filename', 'filename2']
    });
    expect(images).toHaveLength(2);
  });
  it('Should not be able to upload image to car with a non-car', async () => {
    await expect(uploadImageCarUseCase.execute({
      car_id: 'non-car-id',
      images_name: ['filename']
    })).rejects.toEqual(new _AppError.AppError('Invalid Car'));
  });
});