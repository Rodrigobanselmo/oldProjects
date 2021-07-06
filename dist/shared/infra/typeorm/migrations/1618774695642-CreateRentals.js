"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentals1618774695642 = void 0;

var _typeorm = require("typeorm");

class CreateRentals1618774695642 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'rentals',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'car_id',
        type: 'uuid'
      }, {
        name: 'user_id',
        type: 'uuid'
      }, {
        name: 'start_date',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'end_date',
        type: 'timestamp',
        isNullable: true
      }, {
        name: 'return_date',
        type: 'timestamp'
      }, {
        name: 'total',
        type: 'numeric(2)'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'FK_CAR_RENTAL',
        referencedTableName: 'cars',
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }, {
        name: 'FK_USER_RENTAL',
        referencedTableName: 'users',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }]
    }), true);
  }

  async down(queryRunner) {
    await queryRunner.dropTable('rentals');
  }

}

exports.CreateRentals1618774695642 = CreateRentals1618774695642;