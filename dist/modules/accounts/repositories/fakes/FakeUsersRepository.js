"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeUsersRepository = void 0;

var _User = require("../../infra/typeorm/entities/User");

class FakeUsersRepository {
  constructor() {
    this.users = [];
  }

  async create({
    name,
    email,
    password,
    driver_license
  }) {
    const user = new _User.User();
    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
      created_at: new Date(),
      avatar: null
    });
    this.users.push(user);
    return user;
  }

  async list() {
    return this.users;
  }

  async findByEmail(email) {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  async findById(user_id) {
    const user = this.users.find(user => user.id === user_id);
    return user;
  }

  async save(user) {
    const userIndex = this.users.findIndex(userFind => userFind.id === user.id);
    this.users.splice(userIndex, 1, user);
    return user;
  }

}

exports.FakeUsersRepository = FakeUsersRepository;