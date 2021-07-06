"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;

var _User = require("../entities/User");

var _typeorm = require("typeorm");

class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }

  async create({
    name,
    password,
    email,
    driver_license
  }) {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license
    });
    await this.repository.save(user);
    return user;
  }

  async list() {
    const users = await this.repository.find();
    return users;
  }

  findByEmail(email) {
    return this.repository.findOne({
      email
    });
  }

  findById(user_id) {
    const user = this.repository.findOne(user_id);
    return user;
  }

  async save(user) {
    return this.repository.save(user);
  }

}

exports.UsersRepository = UsersRepository;