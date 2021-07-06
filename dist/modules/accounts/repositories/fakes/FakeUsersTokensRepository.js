"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeUsersTokensRepository = void 0;

var _UserTokens = require("../../infra/typeorm/entities/UserTokens");

class FakeUsersTokensRepository {
  constructor() {
    this.usersTokens = [];
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = new _UserTokens.UserToken();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const userToken = this.usersTokens.find(token => token.user_id === user_id && token.refresh_token === refresh_token);
    return userToken;
  }

  async findByRefreshToken(token) {
    const userToken = this.usersTokens.find(userToken => userToken.refresh_token === token);
    return userToken;
  }

  async delete(id) {
    const userTokenIndex = this.usersTokens.findIndex(token => token.id === id);
    this.usersTokens.splice(userTokenIndex, 1);
  }

}

exports.FakeUsersTokensRepository = FakeUsersTokensRepository;