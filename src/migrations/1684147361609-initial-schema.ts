import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';
import { encodePassword } from '../utils/bcrypt';

export class InitialSchema1684147361609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('user');
    if (!tableExists) {
      await queryRunner.createTable(
        new Table({
          name: 'user',
          columns: [
            {
              name: 'id',
              type: 'int',
              unsigned: true,
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'username',
              type: 'varchar',
              length: '255',
            },
            {
              name: 'email',
              type: 'varchar',
              length: '255',
            },
            {
              name: 'password',
              type: 'varchar',
              length: '255',
            },
            {
              name: 'role',
              type: 'int',
              unsigned: true,
            },
          ],
        }),
      );

      await queryRunner.createIndex(
        'user',
        new TableIndex({
          name: 'UQ_user_email',
          columnNames: ['email'],
          isUnique: true,
        }),
      );

      await queryRunner.createForeignKey(
        'user',
        new TableForeignKey({
          columnNames: ['role'],
          referencedTableName: 'role',
          referencedColumnNames: ['id'],
        }),
      );
    }
    const rowCount = await queryRunner.query('SELECT COUNT(*) FROM user');
    const isEmpty = parseInt(rowCount[0]['COUNT(*)'], 10) === 0;

    console.log(isEmpty);

    if (isEmpty) {
      const adminRole = await queryRunner.query(
        "SELECT id FROM role WHERE name = 'admin'",
      );
      const userRole = await queryRunner.query(
        "SELECT id FROM role WHERE name = 'user'",
      );

      const adminRoleId = adminRole[0].id;
      const userRoleId = userRole[0].id;

      const adminPassword = await encodePassword('admin123');
      const userPassword = await encodePassword('user123');

      console.log('key', adminRole);

      await queryRunner.query(
        `INSERT INTO user (username, email, password, role) VALUES ('admin', 'admin@example.com', '${adminPassword}', ${adminRoleId})`,
      );

      await queryRunner.query(
        `INSERT INTO user (username, email, password, role) VALUES ('user', 'user@example.com', '${userPassword}', ${userRoleId})`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
    await queryRunner.dropIndex('user', 'UQ_user_email');
  }
}
