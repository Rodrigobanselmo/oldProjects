"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsers1617071102412 = void 0;

var _typeorm = require("typeorm");

class CreateUsers1617071102412 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'driver_license',
        type: 'varchar'
      }, {
        name: 'admin',
        type: 'boolean',
        default: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }), true);
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }

}

exports.CreateUsers1617071102412 = CreateUsers1617071102412;