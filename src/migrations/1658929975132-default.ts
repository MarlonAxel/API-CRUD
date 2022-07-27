import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658929975132 implements MigrationInterface {
    name = 'default1658929975132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filmes" ADD "ano_lancamento" integer`);
        await queryRunner.query(`ALTER TABLE "series" ADD "ano_lancamento" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "series" DROP COLUMN "ano_lancamento"`);
        await queryRunner.query(`ALTER TABLE "filmes" DROP COLUMN "ano_lancamento"`);
    }

}
