import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MealService } from './meal.service';

describe('MealService', () => {
  let service: MealService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(MealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
