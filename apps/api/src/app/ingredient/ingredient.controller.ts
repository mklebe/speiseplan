import { Ingredient } from "@prisma/client";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { IngredientService } from "./ingredient.service"
import { SearchService } from "../search/search.service";

@Controller('ingredient')
export class IngredientController {
  constructor(
    private readonly searchService: SearchService,
    private readonly ingredientService: IngredientService
  ) {}

  @Post()
  async createIngredient(
    @Body() ingredient: Ingredient
  ): Promise<Ingredient> {
    const savedIng =  await this.ingredientService.createIngredient(ingredient);
    await this.searchService.addIngredient(savedIng);

    return savedIng
  }

  @Get()
  async getIngredients(): Promise<Ingredient[]> {
    return this.ingredientService.getAll();
  }

  @Get('search/:term')
  async searchIngredient(@Param('term') term: string): Promise<Ingredient[]> {
    return this.searchService.searchIngredient(term);
  }

  @Patch(':id')
  async updateIngredient(@Param('id') id: string, @Body() ingredient: Ingredient): Promise<Ingredient> {
    return this.ingredientService.updateIngredient(parseInt(id), ingredient);
  }

  @Delete(':id')
  async deleteIngredient(@Param('id') id: string): Promise<void> {
    return this.ingredientService.deleteIngredient(parseInt(id));
  }
}
