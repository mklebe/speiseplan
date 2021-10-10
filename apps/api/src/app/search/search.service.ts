import { Ingredient } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch'

interface SearchIngredient extends Ingredient {
  suggest: Array<{
    input: string,
    weight: number,
  }>;
}

const INGREDIENT_SEARCH_INDEX = 'ingredient-search-index';

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticSearch: ElasticsearchService,
  ) {}

  async dropIndices(): Promise<any> {
    const index: string = INGREDIENT_SEARCH_INDEX;

    await this.elasticSearch.indices.delete({ index })
      .then(() => {
        console.log(`Successfully deleted index: ${index}`)
      })
      .catch(() => {
        console.log(`Could not delete ${index}, continue`);
      })

    await this.elasticSearch.indices.create({ 
      index,
      body: {
        mappings: {
          "properties": {
            "name": {
              "type": "text",
            },
            suggest: {
              type: "completion"
            }
          }
        }
      }
    })
  }

  async searchIngredient(term: string): Promise<Ingredient[]> {
    const a = await this.elasticSearch.search({
      body: {
        suggest: {
          [INGREDIENT_SEARCH_INDEX]: {
            prefix: term,
            completion: {
              field: 'suggest',
              fuzzy: {
                fuzziness: 1,
              }
            }
          }
        }
      }
    });

    const result: Ingredient[] = 
      a.body.suggest[INGREDIENT_SEARCH_INDEX][0].options.map((si: any) => {
        return this.getIngredientFromSearchIngredient(si._source)
    })
    return result;
  }

  async addIngredient( ingredient: Ingredient ): Promise<any> {
    return this.elasticSearch.index({
      index: INGREDIENT_SEARCH_INDEX,
      body: ingredient,
    });
  }

  private getSearchIngredientFromIngredient(ingredient: Ingredient): SearchIngredient {
    const suggest = ingredient.name.split(' ').map(( term ) => {
      return {
        input: term,
        weight: 1,
      }
    })
    
    return { 
      suggest,
      ... ingredient,
    }
  }

  private getIngredientFromSearchIngredient(si: SearchIngredient): Ingredient {
    const ingredient = {...si};
    delete ingredient.suggest

    return ingredient;
  }

  async bulkAddIngredients( ingredients: Ingredient[] ): Promise<any> {
    if( ingredients.length === 0 ) {
      return Promise.resolve()
    }
    const body: Array<any> = [];
    ingredients.forEach((ingredient) => {
      body.push({
        index: {
          '_index': INGREDIENT_SEARCH_INDEX,
          '_type': '_doc'
        }
      })
      body.push(
        this.getSearchIngredientFromIngredient(ingredient)
       );
    })

    this.elasticSearch.bulk({
      body,
      index: INGREDIENT_SEARCH_INDEX,
    })
  }
}
