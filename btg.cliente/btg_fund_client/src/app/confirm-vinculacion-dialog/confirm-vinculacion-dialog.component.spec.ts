import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmVinculacionDialogComponent } from './confirm-vinculacion-dialog.component';

describe('ConfirmVinculacionDialogComponent', () => {
  let component: ConfirmVinculacionDialogComponent;
  let fixture: ComponentFixture<ConfirmVinculacionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmVinculacionDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmVinculacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
