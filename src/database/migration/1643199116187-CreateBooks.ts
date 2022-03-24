import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateBooks1643199116187 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'books',
      columns: [
        {
          name: 'id',
          type: 'CHAR',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid()',
        },
        {
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'user_id',
          type: 'varchar',
          default: 'uuid()'
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
          name: 'author',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'publishing_company',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'category',
          type: 'varchar',
          isNullable: true
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
          referencedTableName: 'users',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
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
