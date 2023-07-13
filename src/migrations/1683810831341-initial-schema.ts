import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialSchema1683810831341 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('role');
    if (!tableExists) {
      await queryRunner.createTable(
        new Table({
          name: 'role',
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
              name: 'name',
              type: 'varchar',
              length: '255',
            },
          ],
        }),
      );
    }

    const rowCount = await queryRunner.query('SELECT COUNT(*) FROM role');
    const isEmpty = parseInt(rowCount[0]['COUNT(*)'], 10) === 0;

    if (isEmpty) {
      await queryRunner.query(`INSERT INTO role (name) VALUES ('admin')`);
      await queryRunner.query(`INSERT INTO role (name) VALUES ('user')`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role');
  }
}
