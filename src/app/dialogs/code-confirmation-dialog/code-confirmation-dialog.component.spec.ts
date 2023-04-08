import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeConfirmationDialogComponent } from './code-confirmation-dialog.component';

describe('CodeConfirmationDialogComponent', () => {
  let component: CodeConfirmationDialogComponent;
  let fixture: ComponentFixture<CodeConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
