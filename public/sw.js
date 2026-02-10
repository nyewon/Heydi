// FCM SDK 로드
importScripts(
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js",
);

// Firebase 초기화
firebase.initializeApp({
  apiKey: "AIzaSyCti5-5wpSh8pYaJp_SPrZU5bl5nnivvC4",
  authDomain: "heydi-beb30.firebaseapp.com",
  projectId: "heydi-beb30",
  storageBucket: "heydi-beb30.firebasestorage.app",
  messagingSenderId: "643750091676",
  appId: "1:643750091676:web:0b4cc3c200971fd7574659",
  measurementId: "G-88FD86X63L",
});

const messaging = firebase.messaging();

// install event
self.addEventListener("install", () => {
  console.log("[Service Worker] installed");
});

// activate event
self.addEventListener("activate", e => {
  console.log("[Service Worker] actived", e);
});

// fetch event
self.addEventListener("fetch", e => {
  console.log("[Service Worker] fetched resource " + e.request.url);
});

// notification click event
self.addEventListener("notificationclick", event => {
  event.notification.close();

  const targetUrl = "/diary";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url.includes(targetUrl) && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      }),
  );
});

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );

  const { title, body } = payload.notification;

  const notificationOptions = {
    body,
    icon: "icons/icon-24x24.svg",
  };

  self.registration.showNotification(title, notificationOptions);
});
