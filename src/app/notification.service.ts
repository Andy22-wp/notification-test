import { inject, Injectable } from '@angular/core';
    import { Messaging, getToken, onMessage } from '@angular/fire/messaging';

    @Injectable({ providedIn: 'root' })
    export class NotificationService {
      private messaging = inject(Messaging);

      constructor() {
        // Gestisci i messaggi in arrivo quando l'app è in foreground
        onMessage(this.messaging, (payload) => {
          console.log('Message received. ', payload);
          // Mostra una notifica all'utente (potresti usare la tua logica di notifica locale qui)
          alert(`Nuovo messaggio: ${payload.notification?.title} - ${payload.notification?.body}`);
        });
      }

      requestPermissionAndGetToken(): Promise<string | null> {
        return getToken(this.messaging, { vapidKey: 'BAbdHeiO-ygBb9XxApz-8i-iLslZjvBEN8KPXP6NO2naJvCg4QxbT3KMJqjNlQkS8zNb7SXniL8o2MsAKVJ9bAE' })
          .then((currentToken) => {
            if (currentToken) {
              console.log('FCM registration token:', currentToken);
              // Invia il token al tuo server per poter inviare notifiche a questo dispositivo
              return currentToken;
            } else {
              console.log('No registration token available. Request permission to generate one.');
              return null;
            }
          })
          .catch((err) => {
            console.error('An error occurred while retrieving token. ', err);
            return null;
          });
      }

      // Puoi mantenere o modificare i metodi esistenti per le notifiche locali se necessario
      showNotification(title: string, body: string): void {
        // Logica per mostrare notifiche locali, se ancora rilevante
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(title, { body });
        } else if ('Notification' in window && Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification(title, { body });
            }
          });
        }
      }
    }
