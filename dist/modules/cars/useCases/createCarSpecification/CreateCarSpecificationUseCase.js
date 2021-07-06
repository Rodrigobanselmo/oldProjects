"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationUseCase = void 0;

var _ICarsRepository = require("../../repositories/ICarsRepository");

var _ISpecificationsRepository = require("../../repositories/ISpecificationsRepository");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreateCarSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SpecificationsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ISpecificationsRepository.ISpecificationsRepository === "undefined" ? Object : _ISpecificationsRepository.ISpecificationsRepository, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateCarSpecificationUseCase {
  constructor(specificationsRepository, carsRepository) {
    this.specificationsRepository = specificationsRepository;
    this.carsRepository = carsRepository;
  }

  async execute({
    car_id,
    specification_ids
  }) {
    // verifica se existe o carro
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new _AppError.AppError('Car not found');
    } // pega uma lista de especificações


    const specifications = await this.specificationsRepository.findByIds(specification_ids); // salva

    car.specifications = specifications;
    const updatedCar = await this.carsRepository.save(car);
    return updatedCar;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateCarSpecificationUseCase = CreateCarSpecificationUseCase;