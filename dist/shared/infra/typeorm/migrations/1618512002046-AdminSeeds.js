"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminSeeds1618512002046 = void 0;

var _bcryptjs = require("bcryptjs");

var _uuid = require("uuid");

class AdminSeeds1618512002046 {
  async up(queryRunner) {
    const passHash = await (0, _bcryptjs.hash)('qwe123', 8);
    await queryRunner.query(`INSERT INTO USERS
    (id, name, email, password, driver_license, admin, created_at)
    VALUES 
    ('${(0, _uuid.v4)()}', 'Jezmael', 'jezmaelbasilio@gmail.com', '${passHash}', 'QWE!@#', true, 'now()')`);
  }

  async down(queryRunner) {
    await queryRunner.query(`DELETE FROM USERS WHERE email = 'jezmaelbasilio@gmail.com'`);
  }

}

exports.AdminSeeds1618512002046 = AdminSeeds1618512002046;