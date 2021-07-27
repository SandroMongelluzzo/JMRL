import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeamsLayoutComponent } from './manage-teams-layout.component';

describe('ManageTeamsLayoutComponent', () => {
  let component: ManageTeamsLayoutComponent;
  let fixture: ComponentFixture<ManageTeamsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTeamsLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeamsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
