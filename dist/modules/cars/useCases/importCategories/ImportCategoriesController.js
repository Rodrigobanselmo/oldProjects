"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoriesController = void 0;

var _tsyringe = require("tsyringe");

var _ImportCategoriesUseCase = require("./ImportCategoriesUseCase");

class ImportCategoriesController {
  async handle(request, response) {
    const {
      file
    } = request;

    const importCategoriesUseCase = _tsyringe.container.resolve(_ImportCategoriesUseCase.ImportCategoriesUseCase);

    await importCategoriesUseCase.execute(file);
    return response.send();
  }

}

exports.ImportCategoriesController = ImportCategoriesController;