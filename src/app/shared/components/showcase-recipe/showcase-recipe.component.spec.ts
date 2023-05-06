import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseRecipeComponent } from './showcase-recipe.component';

describe('ShowcaseRecipeComponent', () => {
  let component: ShowcaseRecipeComponent;
  let fixture: ComponentFixture<ShowcaseRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcaseRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
