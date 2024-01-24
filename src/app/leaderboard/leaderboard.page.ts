import { Component, OnInit } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonCol, IonRow} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {Leaderboard} from "../leaderboard";
import {LeaderboardService} from "../leaderboard.service";
import {NgForOf} from "@angular/common";
import {time} from "ionicons/icons";

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.page.html',
  styleUrls: ['leaderboard.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, NgForOf, IonLabel, IonCol, IonRow]
})
export class LeaderboardPage implements OnInit{
  leaders: Leaderboard[] = [];

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.getLeaderboards();
  }

  getLeaderboards(): void {
    this.leaderboardService.getLeaderboards()
      .subscribe(leaders => this.leaders = leaders);
  }

  protected readonly time = time;
}
