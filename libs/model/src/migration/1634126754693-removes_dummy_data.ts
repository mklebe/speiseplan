import {MigrationInterface, QueryRunner} from "typeorm";

export class removesDummyData1634126754693 implements MigrationInterface {
    name = 'removesDummyData1634126754693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
    }

}
