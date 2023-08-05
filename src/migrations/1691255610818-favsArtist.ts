import { MigrationInterface, QueryRunner } from "typeorm";

export class FavsArtist1691255610818 implements MigrationInterface {
  name = "FavsArtist1691255610818";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "favArtist" ("favId" uuid NOT NULL DEFAULT uuid_generate_v4(), "artistId" character varying, CONSTRAINT "REL_dffafcdb1b37935e322817b234" UNIQUE ("artistId"), CONSTRAINT "PK_5dfd002b09683c9fcff89bd801d" PRIMARY KEY ("favId"))`);
    await queryRunner.query(`ALTER TABLE "favArtist" ADD CONSTRAINT "FK_dffafcdb1b37935e322817b2344" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "favArtist" DROP CONSTRAINT "FK_dffafcdb1b37935e322817b2344"`);
    await queryRunner.query(`DROP TABLE "favArtist"`);
  }

}
