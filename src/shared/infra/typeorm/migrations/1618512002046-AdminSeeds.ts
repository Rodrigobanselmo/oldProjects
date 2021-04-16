import { hash } from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdminSeeds1618512002046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const passHash = await hash('qwe123', 8);
    await queryRunner.query(`INSERT INTO USERS
    (name, email, password, driver_license, admin, created_at)
    VALUES 
    ('Jezmael', 'jezmaelbasilio@gmail.com', '${passHash}', 'QWE!@#', true, 'now()')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM USERS WHERE email = 'jezmaelbasilio@gmail.com'`,
    );
  }
}
