import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFieldToConfigDialogComponent } from './add-field-to-config-dialog.component';

describe('AddFieldToConfigDialogComponent', () => {
  let component: AddFieldToConfigDialogComponent;
  let fixture: ComponentFixture<AddFieldToConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFieldToConfigDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFieldToConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
