import { Ingredient } from "@prisma/client";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { IngredientService } from "./ingredient.service"

@Controller('ingredient')
export class IngredientController {
  constructor(
    private readonly ingredientService: IngredientService
  ) {}

  @Post()
  async createIngredient(
    @Body() ingredient: Ingredient
  ): Promise<Ingredient> {
    return this.ingredientService.createIngredient(ingredient);
  }

  @Get()
  async getIngredients(): Promise<Ingredient[]> {
    return this.ingredientService.getAll();
  }

  @Patch(':id')
  async updateIngredient(@Param('id') id: string, @Body() ingredient: Ingredient): Promise<Ingredient> {
    return this.ingredientService.updateIngredient(parseInt(id), ingredient);
  }

  @Delete(':id')
  async deleteIngredient(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientService.deleteIngredient(parseInt(id));
  }
}
