import { MigrationInterface, QueryRunner } from "typeorm";

export class FavsArtist1691257049418 implements MigrationInterface {
    name = 'FavsArtist1691257049418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favArtist" ALTER COLUMN "favId" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favArtist" ALTER COLUMN "favId" SET DEFAULT uuid_generate_v4()`);
    }

}
