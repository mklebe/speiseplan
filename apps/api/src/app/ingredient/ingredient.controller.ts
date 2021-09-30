import { Ingredient } from "@prisma/client";
import { Controller, Get } from "@nestjs/common"
import { IngredientService } from "./ingredient.service"

@Controller('ingredient')
export class IngredientController {
  constructor(
    private readonly ingredientService: IngredientService
  ) {}

  @Get()
  async getIngredients(): Promise<Ingredient[]> {
    return this.ingredientService.getAll();
  }
}
