import { Module } from '@nestjs/common';

import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static'
import { IngredientController } from './ingredient/ingredient.controller';
import { IngredientService } from './ingredient/ingredient.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'speiseplan'),
      exclude: ['api'],
    }),
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class AppModule {}
