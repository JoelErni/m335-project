import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-task4',
  templateUrl: './task4.page.html',
  styleUrls: ['./task4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Task4Page implements OnInit {

  constructor() { }


  ngOnInit() {
  }

}
