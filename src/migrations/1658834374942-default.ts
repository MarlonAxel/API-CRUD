import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658834374942 implements MigrationInterface {
    name = 'default1658834374942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "filmes" ("id" SERIAL NOT NULL, "titulo" text NOT NULL, "genero" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_diretor" integer, CONSTRAINT "PK_e7531027ca859ab4acb3a313658" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "series" ("id" SERIAL NOT NULL, "titulo" text NOT NULL, "genero" text NOT NULL, "temporada" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_diretor" integer, CONSTRAINT "PK_e725676647382eb54540d7128ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "diretor" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_107dc6b273880bee9226d158334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "filmes" ADD CONSTRAINT "FK_64222342052b526709acd0e208d" FOREIGN KEY ("id_diretor") REFERENCES "diretor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "series" ADD CONSTRAINT "FK_22671a069a981c0a7ac5f043253" FOREIGN KEY ("id_diretor") REFERENCES "diretor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "series" DROP CONSTRAINT "FK_22671a069a981c0a7ac5f043253"`);
        await queryRunner.query(`ALTER TABLE "filmes" DROP CONSTRAINT "FK_64222342052b526709acd0e208d"`);
        await queryRunner.query(`DROP TABLE "diretor"`);
        await queryRunner.query(`DROP TABLE "series"`);
        await queryRunner.query(`DROP TABLE "filmes"`);
    }

}
