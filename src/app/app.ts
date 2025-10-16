import { Component, inject, OnInit } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { RouterOutlet } from '@angular/router';
    import { NotificationService } from './notification.service'; // Assicurati che il percorso sia corretto

    @Component({
      selector: 'app-root',
      standalone: true,
      imports: [CommonModule, RouterOutlet],
      templateUrl: './app.html', // O template inline
      styleUrl: './app.css', // O style inline
      // Ricorda di aggiungere changeDetection: ChangeDetectionStrategy.OnPush, se non presente
    })
    export class AppComponent implements OnInit {
      private notificationService = inject(NotificationService);

      ngOnInit(): void {
        this.notificationService.requestPermissionAndGetToken().then(token => {
          if (token) {
            console.log('FCM Token ottenuto:', token);
            // Puoi mostrare il token nella UI o inviarlo al backend
          }
        });
      }

      // ... altri metodi del componente
    }
