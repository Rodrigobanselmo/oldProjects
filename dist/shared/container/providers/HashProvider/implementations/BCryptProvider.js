"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BCryptProvider = void 0;

var _bcryptjs = require("bcryptjs");

class BCryptProvider {
  async createHash(password) {
    const passwordHash = await (0, _bcryptjs.hash)(password, 8);
    return passwordHash;
  }

  async compare(password, hash_password) {
    return (0, _bcryptjs.compare)(password, hash_password);
  }

}

exports.BCryptProvider = BCryptProvider;