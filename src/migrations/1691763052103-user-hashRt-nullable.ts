import { MigrationInterface, QueryRunner } from "typeorm";

export class UserHashRtNullable1691763052103 implements MigrationInterface {
    name = 'UserHashRtNullable1691763052103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "hashedRt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "hashedRt" SET NOT NULL`);
    }

}
