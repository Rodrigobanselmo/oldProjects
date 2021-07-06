"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alterUserAvatar1617278234674 = void 0;

var _typeorm = require("typeorm");

class alterUserAvatar1617278234674 {
  async up(queryRunner) {
    const table = await queryRunner.getTable('users');
    const hasAvatar = table === null || table === void 0 ? void 0 : table.findColumnByName('avatar');

    if (!hasAvatar) {
      await queryRunner.addColumn('users', new _typeorm.TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true
      }));
    }
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('users', 'avatar');
  }

}

exports.alterUserAvatar1617278234674 = alterUserAvatar1617278234674;