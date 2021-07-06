"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationsCars1618635428072 = void 0;

var _typeorm = require("typeorm");

class CreateSpecificationsCars1618635428072 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'specifications_cars',
      columns: [{
        name: 'car_id',
        type: 'uuid'
      }, {
        name: 'specification_id',
        type: 'uuid'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'fk_car_id',
        columnNames: ['car_id'],
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }, {
        name: 'fk_specification_id',
        columnNames: ['specification_id'],
        referencedTableName: 'specifications',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('specifications_cars');
  }

}

exports.CreateSpecificationsCars1618635428072 = CreateSpecificationsCars1618635428072;