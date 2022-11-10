import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSearchDialogComponent } from './recipe-search-dialog.component';

describe('RecipeSearchDialogComponent', () => {
  let component: RecipeSearchDialogComponent;
  let fixture: ComponentFixture<RecipeSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
