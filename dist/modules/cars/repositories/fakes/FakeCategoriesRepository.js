"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeCategoriesRepository = void 0;

var _Category = require("../../infra/typeorm/entities/Category");

class FakeCategoriesRepository {
  constructor() {
    this.categories = [];
  }

  async create({
    name,
    description
  }) {
    const category = new _Category.Category();
    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    });
    this.categories.push(category);
    return category;
  }

  async list() {
    return this.categories;
  }

  async findByName(name) {
    const category = this.categories.find(category => category.name === name);
    return category;
  }

  async findById(id) {
    const category = this.categories.find(category => category.id === id);
    return category;
  }

}

exports.FakeCategoriesRepository = FakeCategoriesRepository;