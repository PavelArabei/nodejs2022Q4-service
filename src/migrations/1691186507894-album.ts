import { MigrationInterface, QueryRunner } from "typeorm";

export class Album1691186507894 implements MigrationInterface {
    name = 'Album1691186507894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "albums" ("id" character varying NOT NULL, "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "albums"`);
    }

}
