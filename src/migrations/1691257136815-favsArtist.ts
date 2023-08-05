import { MigrationInterface, QueryRunner } from "typeorm";

export class FavsArtist1691257136815 implements MigrationInterface {
    name = 'FavsArtist1691257136815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favArtist" RENAME COLUMN "favId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "favArtist" RENAME CONSTRAINT "PK_5dfd002b09683c9fcff89bd801d" TO "PK_5e76a58b9a6a273f2e9a1a58a48"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favArtist" RENAME CONSTRAINT "PK_5e76a58b9a6a273f2e9a1a58a48" TO "PK_5dfd002b09683c9fcff89bd801d"`);
        await queryRunner.query(`ALTER TABLE "favArtist" RENAME COLUMN "id" TO "favId"`);
    }

}
