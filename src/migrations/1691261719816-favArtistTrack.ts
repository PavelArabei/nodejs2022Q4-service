import { MigrationInterface, QueryRunner } from "typeorm";

export class FavArtistTrack1691261719816 implements MigrationInterface {
    name = 'FavArtistTrack1691261719816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favAlbum" ("id" uuid NOT NULL, "artistId" character varying, CONSTRAINT "REL_22b0a85e50fe67c6603fde9e6c" UNIQUE ("artistId"), CONSTRAINT "PK_31bedce8d087e9c00ccd8b2e24f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favTrack" ("id" uuid NOT NULL, "artistId" character varying, CONSTRAINT "REL_4799c8f046b64b9bc6861c9bab" UNIQUE ("artistId"), CONSTRAINT "PK_d1764742752456aca387432a98d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favAlbum" ADD CONSTRAINT "FK_22b0a85e50fe67c6603fde9e6cd" FOREIGN KEY ("artistId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favTrack" ADD CONSTRAINT "FK_4799c8f046b64b9bc6861c9bab4" FOREIGN KEY ("artistId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favTrack" DROP CONSTRAINT "FK_4799c8f046b64b9bc6861c9bab4"`);
        await queryRunner.query(`ALTER TABLE "favAlbum" DROP CONSTRAINT "FK_22b0a85e50fe67c6603fde9e6cd"`);
        await queryRunner.query(`DROP TABLE "favTrack"`);
        await queryRunner.query(`DROP TABLE "favAlbum"`);
    }

}
