import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1643003463637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'CHAR',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid()',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'active',
          type: 'boolean',
          default: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        },

      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
