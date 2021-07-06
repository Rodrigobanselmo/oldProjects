"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarUseCase = void 0;

var _ICarsRepository = require("../../repositories/ICarsRepository");

var _ICategoriesRepository = require("../../repositories/ICategoriesRepository");

var _AppError = require("../../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreateCarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _ICategoriesRepository.ICategoriesRepository === "undefined" ? Object : _ICategoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateCarUseCase {
  constructor(carsRepository, categoriesRepository) {
    this.carsRepository = carsRepository;
    this.categoriesRepository = categoriesRepository;
  }

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }) {
    // deve verificar se existe um carro com a mesma placa
    const existCar = await this.carsRepository.findByLicensePlate(license_plate);

    if (existCar) {
      throw new _AppError.AppError('This car already exists', 400);
    } // verifica se existe a categoria


    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new _AppError.AppError('Invalid Category', 400);
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });
    return car;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateCarUseCase = CreateCarUseCase;