import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Network} from "@capacitor/network";
import {ellipse, home, medal, settings, square, triangle, wifi} from "ionicons/icons";
import {addIcons} from "ionicons";
import {HapticsService} from "../haptics.service";
import {TimerService} from "../timer.service";
import {PlayService} from "../play.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-task2',
  templateUrl: './task2.page.html',
  styleUrls: ['./task2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class Task2Page implements OnInit {

  getPoints = false;
  taskDone: boolean = false;
  wasConnected: boolean = false;

  constructor(private router: Router,private hapticsService: HapticsService, private timerService: TimerService, private playService: PlayService) {
    addIcons({ wifi });

    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      if(status.connectionType == 'wifi'){
        this.wasConnected = true;
      }

      if (this.wasConnected && status.connectionType != 'wifi'){
        this.hapticsService.vibrate()
        if(!this.getPoints){
          this.playService.updateScore(this.timerService.get())
          this.getPoints = true
        }
        this.taskDone = true;
      }
    });
  }

  ngOnInit(): void {
      this.timerService.start()
      console.log(this.playService.get())
    }

  nextPage(){
    this.router.navigate(['tabs', 'task3'])
  }
}

