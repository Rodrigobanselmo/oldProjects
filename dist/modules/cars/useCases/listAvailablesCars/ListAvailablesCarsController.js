"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailablesCarsController = void 0;

var _tsyringe = require("tsyringe");

var _ListAvailablesCarsUseCase = require("./ListAvailablesCarsUseCase");

class ListAvailablesCarsController {
  async handle(request, response) {
    const {
      brand,
      category_id,
      name
    } = request.query;

    const listAvailablesCarsUsecase = _tsyringe.container.resolve(_ListAvailablesCarsUseCase.ListAvailablesCarsUseCase);

    const cars = await listAvailablesCarsUsecase.execute({
      brand: brand,
      category_id: category_id,
      name: name
    });
    return response.json(cars);
  }

}

exports.ListAvailablesCarsController = ListAvailablesCarsController;