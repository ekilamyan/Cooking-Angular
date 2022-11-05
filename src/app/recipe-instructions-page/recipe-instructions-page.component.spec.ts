import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeInstructionsPageComponent } from './recipe-instructions-page.component';

describe('RecipeInstructionsPageComponent', () => {
  let component: RecipeInstructionsPageComponent;
  let fixture: ComponentFixture<RecipeInstructionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeInstructionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeInstructionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
