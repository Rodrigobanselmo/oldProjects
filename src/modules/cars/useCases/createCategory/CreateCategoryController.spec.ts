/* eslint-disable import-helpers/order-imports */
/* eslint-disable import/no-extraneous-dependencies */

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 } from 'uuid';

interface IAdminUser {
  email: string;
  password: string;
}

let adminUser: IAdminUser;
let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    adminUser = {
      email: 'teste@test.com',
      password: 'admin',
    };

    const hashPass = await hash(adminUser.password, 8);
    const id = v4();

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, admin, created_at, driver_license)
    VALUES ('${id}', 'teste', '${adminUser.email}', '${hashPass}', true, 'now()', 'qwe123')`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: adminUser.email,
      password: adminUser.password,
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Category supertest',
        description: 'Category supertest',
      });

    expect(response.body).toHaveProperty('id');
  });
});
