"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoriesUseCase = void 0;

var _CategoriesRepository = require("../../infra/typeorm/repositories/CategoriesRepository");

var _csvParser = _interopRequireDefault(require("csv-parser"));

var _fs = _interopRequireDefault(require("fs"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ImportCategoriesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _CategoriesRepository.CategoriesRepository === "undefined" ? Object : _CategoriesRepository.CategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ImportCategoriesUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  loadCategories(file) {
    return new Promise((resolve, reject) => {
      const stream = _fs.default.createReadStream(file.path);

      const importCategories = [];
      const parseFile = (0, _csvParser.default)(['name', 'description']);
      stream.pipe(parseFile);
      parseFile.on('data', async line => {
        const {
          name,
          description
        } = line;
        importCategories.push({
          name,
          description
        });
      }).on('end', () => {
        // fs.promises.unlink(file.path);
        _fs.default.unlinkSync(file.path);

        resolve(importCategories);
      }).on('error', err => reject(err));
    });
  }

  async execute(file) {
    const categories = await this.loadCategories(file);
    categories.map(async category => {
      const {
        name,
        description
      } = category;
      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description
        });
      }
    });
  }
  /* 
  var input = require('fs').readFileSync('/dev/stdin', 'utf8');
  var lines = input.split('\n'); 
  */


}) || _class) || _class) || _class) || _class);
exports.ImportCategoriesUseCase = ImportCategoriesUseCase;