import { MigrationInterface, QueryRunner } from "typeorm";

export class UserHashRt1691762741153 implements MigrationInterface {
    name = 'UserHashRt1691762741153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "hashedRt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hashedRt"`);
    }

}
