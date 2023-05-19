import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPantryComponent } from './empty-pantry.component';

describe('EmptyPantryComponent', () => {
  let component: EmptyPantryComponent;
  let fixture: ComponentFixture<EmptyPantryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyPantryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyPantryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
