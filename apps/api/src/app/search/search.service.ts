import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch'

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticSearch: ElasticsearchService,
  ) {}

  dropIndices(): Promise<any> {
    return this.elasticSearch.indices.delete({index: '_all'})
  }
}
