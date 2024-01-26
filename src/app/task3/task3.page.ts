import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AlertController, IonicModule} from '@ionic/angular';
import {BarcodeScanner, Barcode} from "@capacitor-mlkit/barcode-scanning";
import {HapticsService} from "../haptics.service";
import {TimerService} from "../timer.service";
import {PlayService} from "../play.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task3',
  templateUrl: './task3.page.html',
  styleUrls: ['./task3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Task3Page implements OnInit {
  taskDone = false;
  isSupported = false;
  barcodes: Barcode[] = [];
  getPoints = false
  constructor(private router: Router,private alertController: AlertController, private hapticsService: HapticsService, private timerService: TimerService, private playService: PlayService) {}

  installGoogleBarcodeScannerModule = async () => {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  };


  async ngOnInit() {
    this.installGoogleBarcodeScannerModule();
    this.requestPermissions()
    this.timerService.start()
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      await this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    if(this.barcodes[this.barcodes.length-1].rawValue=='M335@ICT-BZ'){
      console.log("suces")
      this.hapticsService.vibrate()
      if(!this.getPoints){
        this.playService.updateScore(this.timerService.get())
        this.getPoints = true
      }
      this.taskDone = true;
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  nextPage(){
    this.router.navigate(['tabs', 'task4'])
  }

  protected readonly BarcodeScanner = BarcodeScanner;
}
