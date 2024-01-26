import { Component, OnInit, NgZone } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { IonicModule } from '@ionic/angular';
import {Geolocation, Position} from '@capacitor/geolocation';
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-task1',
  templateUrl: './task1.page.html',
  styleUrls: ['./task1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgOptimizedImage]
})

export class Task1Page implements OnInit {

  taskDone = false;

  destinationCoordinates = {latitude: 47.072, longitude: 8.349}

  coords: any = []

  constructor(public zone: NgZone) {

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
    this.WatchPosition()
  }
}
