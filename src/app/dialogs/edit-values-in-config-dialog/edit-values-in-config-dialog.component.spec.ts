import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditValuesInConfigDialogComponent } from './edit-values-in-config-dialog.component';

describe('AddFieldToConfigDialogComponent', () => {
  let component: EditValuesInConfigDialogComponent;
  let fixture: ComponentFixture<EditValuesInConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditValuesInConfigDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditValuesInConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
