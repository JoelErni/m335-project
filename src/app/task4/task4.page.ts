import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Device } from '@capacitor/device';
import {HapticsService} from "../haptics.service";
import {TimerService} from "../timer.service";
import {PlayService} from "../play.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task4',
  templateUrl: './task4.page.html',
  styleUrls: ['./task4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Task4Page implements OnInit {

  isPluggedIn: undefined | boolean = false;
  vibration = false;
  getPoints = false

  constructor(private router: Router ,private hapticsService: HapticsService, private timerService: TimerService, private playService: PlayService) {
    setInterval(() =>{
      this.checkBatteryStatus();
    }, 1000)

  }

  async checkBatteryStatus() {
    try {
      const info = await Device.getBatteryInfo();
      const isCharging = info.isCharging;

      if(isCharging && !this.vibration){
        this.hapticsService.vibrate()
        if(!this.getPoints){
          this.playService.updateScore(this.timerService.get())
          this.getPoints = true
        }
        this.playService.finish()
        console.log(this.playService.get())
        this.vibration = true;
      }

      this.isPluggedIn = isCharging
    } catch (error) {
      console.error('Error checking battery status', error);
    }
  }

  ngOnInit() {
    console.log(this.playService.get())
    this.checkBatteryStatus()
    this.timerService.start()
  }


  nextPage(){
    this.router.navigate(['tabs', 'leaderboard'])
  }
}
