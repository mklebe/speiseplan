import { Ingredient, Recipe, User } from "./src"

const dotenv = require('dotenv')
dotenv.config({ path: '../../.env' })
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const defaultConfig: TypeOrmModuleOptions = {
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   "synchronize": true,
   "logging": true,
   "migrationsTableName": "migration-prod",
   "entities": [
      User,
      Recipe,
      Ingredient,
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "cli": {
      "migrationsDir": "src/migration",
   }
}

export default defaultConfig

export const prodConfig = {
   ... defaultConfig
};

export const testConfig = {
   ... defaultConfig,
   migrationsTableName: "migration-test",
   url: process.env.TEST_DATABASE_URL,
}

