import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeamsAddEditComponent } from './manage-teams-add-edit.component';

describe('ManageTeamsAddEditComponent', () => {
  let component: ManageTeamsAddEditComponent;
  let fixture: ComponentFixture<ManageTeamsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTeamsAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeamsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
