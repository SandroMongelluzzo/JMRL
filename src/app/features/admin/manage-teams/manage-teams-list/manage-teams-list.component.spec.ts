import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageTeamsListComponent } from './manage-teams-list.component';

describe('ManageTeamsListComponent', () => {
  let component: ManageTeamsListComponent;
  let fixture: ComponentFixture<ManageTeamsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTeamsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeamsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});