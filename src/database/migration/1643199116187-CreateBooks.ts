import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateBooks1643199116187 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'books',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'user_id',
          type: 'int',
        },
        {
          name: 'image',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'price',
          type: 'varchar',
        },
        {
          name: 'description',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'category',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },

      ],
      foreignKeys: [
        {
          name: 'books_to_users_fk',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books')
  }

}
