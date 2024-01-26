import { Injectable } from '@angular/core';
import {Play} from "./play";
import  {PLAY} from "./mock-play";
import {LEADERBOARDS} from "./mock-leaderboards";

@Injectable({
  providedIn: 'root'
})
export class PlayService {
  constructor() {}

  setName(name:string)
  {
    PLAY.username = name
  }

  get(){
    return PLAY
  }

  finish(){
    LEADERBOARDS.push({name: PLAY.username, chicken: PLAY.chicken, potato: PLAY.potato, time: PLAY.time})
  }

  updateScore(time: number){
    PLAY.time = PLAY.time + time

    if(time < 120){
      PLAY.chicken = PLAY.chicken + 1
    }
    else if(time >= 120 && time != 0){
      PLAY.potato =  PLAY.potato + 1
    }
  }
}
