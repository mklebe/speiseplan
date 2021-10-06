import { Recipe } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecipeService {

  constructor( private readonly prisma: PrismaService ) {}

  getAll(): Promise<Recipe[]> {
    return this.prisma.recipe.findMany();
  }
}
