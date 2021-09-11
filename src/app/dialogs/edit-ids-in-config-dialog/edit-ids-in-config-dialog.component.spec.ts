import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIdsInConfigDialogComponent } from './edit-ids-in-config-dialog.component';

describe('AddFieldToConfigDialogComponent', () => {
  let component: EditIdsInConfigDialogComponent;
  let fixture: ComponentFixture<EditIdsInConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIdsInConfigDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIdsInConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
