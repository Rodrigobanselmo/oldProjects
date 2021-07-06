"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;

var _Category = require("../entities/Category");

var _typeorm = require("typeorm");

class CategoriesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Category.Category);
  }

  async findById(id) {
    const car = this.repository.findOne(id);
    return car;
  }

  async create({
    name,
    description
  }) {
    const category = this.repository.create({
      name,
      description
    });
    await this.repository.save(category);
    return category;
  }

  async list() {
    const categories = await this.repository.find();
    return categories;
  }

  findByName(name) {
    return this.repository.findOne({
      name
    });
  }

}

exports.CategoriesRepository = CategoriesRepository;