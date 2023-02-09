import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntolerancesDialogComponent } from './intolerances-dialog.component';

describe('IntolerancesDialogComponent', () => {
  let component: IntolerancesDialogComponent;
  let fixture: ComponentFixture<IntolerancesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntolerancesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntolerancesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
