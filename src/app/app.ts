import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { initializeApp } from '@angular/fire/app';
import { getMessaging, getToken, onMessage } from '@angular/fire/messaging';
import { firebaseConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private messaging: any;

  constructor() {
    
  }

  sendNotification() {
    this.notificationService.sendNotification('Test Notification', 'This is a test notification from the app.');
  }

  ngOnInit(): void {
    const app = initializeApp(firebaseConfig);
    this.messaging = getMessaging(app);
    // this.notificationService.requestPermission();
    this.requestPermission();

    onMessage(this.messaging, (payload) => {
      alert(JSON.stringify(payload));
      // ...
    });
  }

  requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        getToken(this.messaging, {
          vapidKey: firebaseConfig.apiKey,
        })
          .then((currentToken: string) => {
            if (currentToken) {
              console.log(currentToken);
            } else {
              console.log(
                'No registration token available. Request permission to generate one.'
              );
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    });
  }
}
