import { Injectable } from '@angular/core';
import { Haptics} from "@capacitor/haptics";

@Injectable({
  providedIn: 'root'
})
export class HapticsService {

  constructor() { }

  vibrate = async () => {
    await Haptics.vibrate({duration: 1000});
  };
}
