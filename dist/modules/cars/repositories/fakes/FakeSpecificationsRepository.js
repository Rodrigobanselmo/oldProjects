"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeSpecificationsRepository = void 0;

var _Specification = require("../../infra/typeorm/entities/Specification");

class FakeSpecificationsRepository {
  constructor() {
    this.specifications = [];
  }

  async create({
    name,
    description
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    });
    this.specifications.push(specification);
    return specification;
  }

  async list() {
    return this.specifications;
  }

  async findByName(name) {
    const specification = this.specifications.find(specification => specification.name === name);
    return specification;
  }

  async findById(id) {
    const specification = this.specifications.find(specification => specification.id === id);
    return specification;
  }

  async findByIds(ids) {
    const specification = this.specifications.filter(specification => ids.includes(specification.id));
    return specification;
  }

}

exports.FakeSpecificationsRepository = FakeSpecificationsRepository;