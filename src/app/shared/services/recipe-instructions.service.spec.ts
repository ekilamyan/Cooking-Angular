import { TestBed } from '@angular/core/testing';

import { RecipeInstructionsService } from './recipe-instructions.service';

describe('RecipeInstructionsService', () => {
  let service: RecipeInstructionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeInstructionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
