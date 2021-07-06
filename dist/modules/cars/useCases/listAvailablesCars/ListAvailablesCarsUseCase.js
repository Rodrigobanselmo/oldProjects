"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailablesCarsUseCase = void 0;

var _ICarsRepository = require("../../repositories/ICarsRepository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let ListAvailablesCarsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CarsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListAvailablesCarsUseCase {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute(data) {
    const cars = await this.carsRepository.findAvailables({
      brand: data === null || data === void 0 ? void 0 : data.brand,
      category_id: data === null || data === void 0 ? void 0 : data.category_id,
      name: data === null || data === void 0 ? void 0 : data.name
    });
    return cars;
  }

}) || _class) || _class) || _class) || _class);
exports.ListAvailablesCarsUseCase = ListAvailablesCarsUseCase;