"use strict";

var _app = require("../../../../shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("../../../../shared/infra/typeorm"));

var _bcryptjs = require("bcryptjs");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import-helpers/order-imports */

/* eslint-disable import/no-extraneous-dependencies */
let connection;
describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const hashPass = await (0, _bcryptjs.hash)('admin', 8);
    const id = (0, _uuid.v4)();
    await connection.query(`
    INSERT INTO USERS(id, name, email, password, admin, created_at, driver_license)
    VALUES ('${id}', 'teste', 'teste@test.com', '${hashPass}', true, 'now()', 'qwe123')`);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should be able to create a new category', async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'teste@test.com',
      password: 'admin'
    });
    const {
      token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post('/categories').set('Authorization', `Bearer ${token}`).send({
      name: 'Category supertest2',
      description: 'Category supertest'
    });
    expect(response.body).toHaveProperty('id');
  });
});