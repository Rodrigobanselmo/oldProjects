"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarImages1618678897762 = void 0;

var _typeorm = require("typeorm");

class CreateCarImages1618678897762 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'cars_image',
      columns: [{
        name: 'id',
        type: 'uuid'
      }, {
        name: 'image_name',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'car_id',
        type: 'uuid'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'fk_car_image',
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }]
    }), true);
  }

  async down(queryRunner) {
    await queryRunner.dropTable('cars_image');
  }

}

exports.CreateCarImages1618678897762 = CreateCarImages1618678897762;