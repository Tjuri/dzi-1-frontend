import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditConfigComponent } from './create-edit-config.component';

describe('CreateEditConfigComponent', () => {
  let component: CreateEditConfigComponent;
  let fixture: ComponentFixture<CreateEditConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
