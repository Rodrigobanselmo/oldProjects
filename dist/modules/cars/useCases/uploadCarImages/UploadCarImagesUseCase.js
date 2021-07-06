"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImagesUseCase = void 0;

var _ICarImagesRepository = require("../../repositories/ICarImagesRepository");

var _ICarsRepository = require("../../repositories/ICarsRepository");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let UploadCarImagesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CarImagesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _ICarImagesRepository.ICarImagesRepository === "undefined" ? Object : _ICarImagesRepository.ICarImagesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UploadCarImagesUseCase {
  constructor(carsRepository, carImagesRepository) {
    this.carsRepository = carsRepository;
    this.carImagesRepository = carImagesRepository;
  }

  async execute({
    car_id,
    images_name
  }) {
    // verifica se existe o carro
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new _AppError.AppError('Invalid Car');
    } // faz o upload do arquivo
    // salva a imagem no banco


    const images = await this.carImagesRepository.create(car_id, images_name);
    return images;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UploadCarImagesUseCase = UploadCarImagesUseCase;