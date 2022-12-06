import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCookingComponent } from './start-cooking.component';

describe('StartCookingComponent', () => {
  let component: StartCookingComponent;
  let fixture: ComponentFixture<StartCookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
