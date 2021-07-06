"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCars1618290744412 = void 0;

var _typeorm = require("typeorm");

class CreateCars1618290744412 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'cars',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'daily_rate',
        type: 'numeric'
      }, {
        name: 'available',
        type: 'boolean',
        default: true
      }, {
        name: 'license_plate',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'fine_amount',
        type: 'numeric'
      }, {
        name: 'brand',
        type: 'varchar'
      }, {
        name: 'category_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'FKCategoryCar',
        referencedTableName: 'categories',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }]
    }), true);
  }

  async down(queryRunner) {
    await queryRunner.dropTable('cars');
  }

}

exports.CreateCars1618290744412 = CreateCars1618290744412;