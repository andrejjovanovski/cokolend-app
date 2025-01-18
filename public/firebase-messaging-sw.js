// Import Firebase scripts for service workers
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize Firebase app
firebase.initializeApp({
  apiKey: "AIzaSyBeLx5qTZHJK5kAK3essJ5_r85aGYBs_RE",
  authDomain: "cokolend-24034.firebaseapp.com",
  projectId: "cokolend-24034",
  storageBucket: "cokolend-24034.firebasestorage.app",
  messagingSenderId: "631252094042",
  appId: "1:631252094042:web:69e986376770e1a312dc63",
  measurementId: "G-1F0X2EP4J5"
});

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Listen for background messages
messaging.onBackgroundMessage((payload) => {

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    sound: 'default' // Optional, for custom behavior on some browsers
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {

  event.notification.close(); // Close the notification

  // Retrieve the URL from the notification data
  const url = event.notification.data?.fcmOptions?.link || event.notification.data?.url;

  if (url) {
    // Open the URL in a new tab or focus on the existing one
    event.waitUntil(clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    }));
  }
});
