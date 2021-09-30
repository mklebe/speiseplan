import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Ingredient, PrismaClient } from '@prisma/client'


@Injectable()
export class IngredientService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  getAll(): Promise<Ingredient[]> {
    return this.ingredient.findMany();
  }
}
