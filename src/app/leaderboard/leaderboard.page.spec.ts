import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardPage } from './leaderboard.page';

describe('leaderboardPage', () => {
  let component: LeaderboardPage;
  let fixture: ComponentFixture<LeaderboardPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(LeaderboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
