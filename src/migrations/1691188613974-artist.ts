import { MigrationInterface, QueryRunner } from "typeorm";

export class Artist1691188613974 implements MigrationInterface {
    name = 'Artist1691188613974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artist" ("id" character varying NOT NULL, "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "artist"`);
    }

}
