import { MigrationInterface, QueryRunner } from "typeorm";

export class All1691332951049 implements MigrationInterface {
    name = 'All1691332951049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artist" ("id" character varying NOT NULL, "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favArtist" ("id" uuid NOT NULL, "artistId" character varying, CONSTRAINT "REL_dffafcdb1b37935e322817b234" UNIQUE ("artistId"), CONSTRAINT "PK_5e76a58b9a6a273f2e9a1a58a48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums" ("id" character varying NOT NULL, "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favAlbum" ("id" uuid NOT NULL, "albumId" character varying, CONSTRAINT "REL_2791fdce7bccad0c8a9d4e2ec2" UNIQUE ("albumId"), CONSTRAINT "PK_31bedce8d087e9c00ccd8b2e24f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracks" ("id" character varying NOT NULL, "name" character varying NOT NULL, "artistId" character varying, "albumId" character varying, "duration" integer NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favTrack" ("id" uuid NOT NULL, "trackId" character varying, CONSTRAINT "REL_a8aff1642bfd36ea951148d781" UNIQUE ("trackId"), CONSTRAINT "PK_d1764742752456aca387432a98d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "login" character varying NOT NULL, "version" integer NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favArtist" ADD CONSTRAINT "FK_dffafcdb1b37935e322817b2344" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favAlbum" ADD CONSTRAINT "FK_2791fdce7bccad0c8a9d4e2ec2b" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favTrack" ADD CONSTRAINT "FK_a8aff1642bfd36ea951148d7814" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favTrack" DROP CONSTRAINT "FK_a8aff1642bfd36ea951148d7814"`);
        await queryRunner.query(`ALTER TABLE "favAlbum" DROP CONSTRAINT "FK_2791fdce7bccad0c8a9d4e2ec2b"`);
        await queryRunner.query(`ALTER TABLE "favArtist" DROP CONSTRAINT "FK_dffafcdb1b37935e322817b2344"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "favTrack"`);
        await queryRunner.query(`DROP TABLE "tracks"`);
        await queryRunner.query(`DROP TABLE "favAlbum"`);
        await queryRunner.query(`DROP TABLE "albums"`);
        await queryRunner.query(`DROP TABLE "favArtist"`);
        await queryRunner.query(`DROP TABLE "artist"`);
    }

}
