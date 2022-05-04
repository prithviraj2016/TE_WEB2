import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlayersTeamComponent } from './manage-players-team.component';

describe('ManagePlayersTeamComponent', () => {
  let component: ManagePlayersTeamComponent;
  let fixture: ComponentFixture<ManagePlayersTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePlayersTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePlayersTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
