import { MigrationInterface, QueryRunner } from "typeorm";

export class default1660309257746 implements MigrationInterface {
    name = 'default1660309257746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filmes" ADD "ano_lancamento" integer`);
        await queryRunner.query(`ALTER TABLE "filmes" ADD "duracao" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filmes" DROP COLUMN "duracao"`);
        await queryRunner.query(`ALTER TABLE "filmes" DROP COLUMN "ano_lancamento"`);
    }

}
