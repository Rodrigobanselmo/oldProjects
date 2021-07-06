"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCarsController = void 0;

var _tsyringe = require("tsyringe");

var _ListCarsUseCase = require("./ListCarsUseCase");

class ListCarsController {
  async handle(request, response) {
    const listCarsUseCase = _tsyringe.container.resolve(_ListCarsUseCase.ListCarsUseCase);

    const cars = await listCarsUseCase.execute();
    return response.json(cars);
  }

}

exports.ListCarsController = ListCarsController;