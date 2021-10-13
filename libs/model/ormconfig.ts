const dotenv = require('dotenv')
dotenv.config()

export = {
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   "synchronize": true,
   "logging": true,
   "entities": [
      "apps/**/*.entity.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "cli": {
      "migrationsDir": "src/migration",
   }
}