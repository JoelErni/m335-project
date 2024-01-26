import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Geolocation, Position} from "@capacitor/geolocation";

@Component({
  selector: 'app-task2',
  templateUrl: './task2.page.html',
  styleUrls: ['./task2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Task2Page implements OnInit {

  distance:number = 0;

  startPos:null = null;

  pos:any = [];


  constructor() {
  }

  WatchPosition = async () => {
    await Geolocation.watchPosition(
      {enableHighAccuracy: true},
      (data: any) => {
        const coordinates = data;
        this.pos.push(data.coords)

        const lat1 = coordinates.coords.latitude;
        const lon1 = coordinates.coords.longitude;

        // @ts-ignore
        const lat2 = this.startPos.coords.latitude;
        // @ts-ignore
        const lon2 = this.startPos.coords.longitude;

        const R = 6371e3;
        const aa = lat1 * Math.PI/180;
        const b = lat2 * Math.PI/180;
        const cc = (lat2-lat1) * Math.PI/180;
        const dd = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(cc/2) * Math.sin(cc/2) +
          Math.cos(aa) * Math.cos(b) *
          Math.sin(dd/2) * Math.sin(dd/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres

        this.distance = d;
      }
    );
  }
  ngOnInit() {
    this.WatchPosition()
  }

  setStart(){
    this.startPos = this.pos[this.pos.length-1]
  }
}

