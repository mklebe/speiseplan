import { Ingredient } from "@prisma/client";
import { Controller, Get } from "@nestjs/common"
import { IngredientService } from "./ingredient.service"

@Controller()
export class IngredientController {
  constructor(
    private readonly ingredientService: IngredientService
  ) {}

  @Get('ingredient')
  async getIngredients(): Promise<Ingredient[]> {
    return this.ingredientService.getAll();
  }
}
