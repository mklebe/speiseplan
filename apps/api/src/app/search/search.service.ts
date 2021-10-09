import { Ingredient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch'

const INGREDIENT_SEARCH_INDEX = 'ingredient-search-index';

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticSearch: ElasticsearchService,
  ) {}

  async dropIndices(): Promise<any> {
    const index: string = INGREDIENT_SEARCH_INDEX;

    try {
      this.elasticSearch.indices.delete({ index })
    } catch(e) {
      console.log(`Could not delete ${index}, continue`);
    }

    return this.elasticSearch.indices.create({
      index,
    })
  }

  async addIngredient( ingredient: Ingredient ): Promise<any> {
    return this.elasticSearch.index({
      index: INGREDIENT_SEARCH_INDEX,
      body: ingredient,
    });
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
      body.push( ingredient );
    })

    this.elasticSearch.bulk({
      body,
      index: INGREDIENT_SEARCH_INDEX,
    })
  }
}
