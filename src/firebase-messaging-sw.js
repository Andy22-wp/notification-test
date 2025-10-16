importScripts(
    "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js"
  );
  
  const firebaseConfig  = {
      apiKey: "AIzaSyDusC-AJjp3pBdicQ1TI7nll2HgkB19aLg",
      authDomain: "ngtestapp-a1fcc.firebaseapp.com",
      projectId: "ngtestapp-a1fcc",
      storageBucket: "ngtestapp-a1fcc.appspot.com",
      messagingSenderId: "427096670573",
      appId: "1:427096670573:web:8b84215a7c123b27c39a64"
    };
  
  const app = firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  
  // Handle incoming messages. Set backgroundMessage to true to make it work.
  messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/favicon.ico' // O un'icona personalizzata
    };

    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });

  