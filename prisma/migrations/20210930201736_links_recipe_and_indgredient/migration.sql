-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientsInRecipe" (
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "IngredientsInRecipe_pkey" PRIMARY KEY ("recipeId","ingredientId")
);

-- AddForeignKey
ALTER TABLE "IngredientsInRecipe" ADD CONSTRAINT "IngredientsInRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsInRecipe" ADD CONSTRAINT "IngredientsInRecipe_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
