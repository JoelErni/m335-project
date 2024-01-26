import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  seconds: number = 0;
  constructor() { }

  start(){
    setInterval(()=>{this.seconds++}, 1000)
  }

  get(){
    return this.seconds
  }

}
