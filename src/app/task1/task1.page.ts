import { Component, OnInit, NgZone } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { IonicModule } from '@ionic/angular';
import {Geolocation, Position} from '@capacitor/geolocation';
import {FormsModule} from "@angular/forms";
import {HapticsService} from "../haptics.service";
import {PlayService} from "../play.service";
import {TimerService} from "../timer.service";
import {Router} from "@angular/router"
import {fastFood} from "ionicons/icons";


@Component({
  selector: 'app-task1',
  templateUrl: './task1.page.html',
  styleUrls: ['./task1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgOptimizedImage]
})

export class Task1Page implements OnInit {

  taskDone = false;
  getPoints: boolean = false;

  destinationCoordinates = {latitude: 47.072, longitude: 8.349}

  coords: any = []

  constructor(private router: Router, public zone: NgZone, private hapticsService: HapticsService, private playService: PlayService, private timerService: TimerService) {

  }

  WatchPosition = async() => { await Geolocation.watchPosition(
    { enableHighAccuracy: true},
    (data:any)=>{
      const coordinates = data;

      if(
        (parseFloat(coordinates.coords.longitude.toFixed(4)) == this.destinationCoordinates.longitude) &&
        (parseFloat(coordinates.coords.latitude.toFixed(4)) == this.destinationCoordinates.latitude)
      ){
        console.log("Destination reached!")
        if(!this.getPoints){
          this.playService.updateScore(this.timerService.get())
          this.getPoints = true
        }
        this.hapticsService.vibrate()
        this.taskDone = true;
      }


     console.log('Current position:', coordinates);
      this.zone.run(() => {
        this.coords.push((parseFloat(coordinates.coords.latitude.toFixed(4)).toString()) + ', '+ (parseFloat(coordinates.coords.longitude.toFixed(4))).toString());
      })
    }
  );
  }

  ngOnInit() {
    this.timerService.start()
    this.WatchPosition()
    console.log(this.playService.get())
  }

  nextPage(){
    this.router.navigate(['tabs', 'task2'])
  }
}
