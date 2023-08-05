import { MigrationInterface, QueryRunner } from "typeorm";

export class FavArtistTrack1691262036864 implements MigrationInterface {
    name = 'FavArtistTrack1691262036864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favAlbum" DROP CONSTRAINT "FK_22b0a85e50fe67c6603fde9e6cd"`);
        await queryRunner.query(`ALTER TABLE "favTrack" DROP CONSTRAINT "FK_4799c8f046b64b9bc6861c9bab4"`);
        await queryRunner.query(`ALTER TABLE "favAlbum" RENAME COLUMN "artistId" TO "albumId"`);
        await queryRunner.query(`ALTER TABLE "favTrack" RENAME COLUMN "artistId" TO "trackId"`);
        await queryRunner.query(`ALTER TABLE "favAlbum" ADD CONSTRAINT "FK_2791fdce7bccad0c8a9d4e2ec2b" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favTrack" ADD CONSTRAINT "FK_a8aff1642bfd36ea951148d7814" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favTrack" DROP CONSTRAINT "FK_a8aff1642bfd36ea951148d7814"`);
        await queryRunner.query(`ALTER TABLE "favAlbum" DROP CONSTRAINT "FK_2791fdce7bccad0c8a9d4e2ec2b"`);
        await queryRunner.query(`ALTER TABLE "favTrack" RENAME COLUMN "trackId" TO "artistId"`);
        await queryRunner.query(`ALTER TABLE "favAlbum" RENAME COLUMN "albumId" TO "artistId"`);
        await queryRunner.query(`ALTER TABLE "favTrack" ADD CONSTRAINT "FK_4799c8f046b64b9bc6861c9bab4" FOREIGN KEY ("artistId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favAlbum" ADD CONSTRAINT "FK_22b0a85e50fe67c6603fde9e6cd" FOREIGN KEY ("artistId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
