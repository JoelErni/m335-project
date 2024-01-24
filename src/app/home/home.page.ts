import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonFooter,
  IonInput,
  IonList, IonItem, IonText, IonRouterOutlet, IonNav, IonNavLink, IonAlert
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {RouterLink} from "@angular/router";
import { AlertController } from '@ionic/angular';
import {Router} from "@angular/router"


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButton, IonFooter, IonInput, IonList, IonItem, IonText, RouterLink, IonRouterOutlet, IonNav, IonNavLink, IonAlert],
})
export class HomePage {
  constructor(private alertController: AlertController, private router: Router) {}

  validations = {
    'name': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 1 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'usernameNotAvailable', message: 'Your username is already taken.' }
    ],
    // other validations
  };

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      disabled: true,
      handler: (data:any) => {
        let name = data.name
        if (name.length > 0){
          this.router.navigate(['tabs', 'settings'])
        }
      }
    }
  ];

  public alertInputs = [
    {
      type: 'text',
      placeholder: 'Your name',
      name: 'name',
    },
  ]

    setResult(ev:any) {
      console.log(`Dismissed with role: ${ev.detail.role}`);
    }
}
