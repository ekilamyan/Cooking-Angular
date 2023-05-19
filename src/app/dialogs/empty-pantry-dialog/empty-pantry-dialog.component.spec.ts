import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPantryDialogComponent } from './empty-pantry-dialog.component';

describe('EmptyPantryDialogComponent', () => {
  let component: EmptyPantryDialogComponent;
  let fixture: ComponentFixture<EmptyPantryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyPantryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyPantryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
