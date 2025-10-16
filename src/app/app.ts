import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private notificationService = inject(NotificationService);

  constructor() {
    this.notificationService.requestPermission();
  }

  sendNotification() {
    this.notificationService.sendNotification('Test Notification', 'This is a test notification from the app.');
  }
}
