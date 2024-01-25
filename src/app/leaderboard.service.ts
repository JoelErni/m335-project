import {Injectable} from '@angular/core';
import {Leaderboard} from "./leaderboard";
import {LEADERBOARDS} from "./mock-leaderboards";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  getLeaderboards(): Observable<Leaderboard[]> {
    return of(LEADERBOARDS);
  }

  getLeadboard(id: number): Observable<Leaderboard> {
    const leader = LEADERBOARDS.find(h => h.id === id)!;
    return of(leader);
  }
}
