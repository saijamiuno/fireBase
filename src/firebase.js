import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAEo6Pp5k-GI5u1PFwM5V-1YdC3OOyc_fc",
  authDomain: "testingredux-d677c.firebaseapp.com",
  projectId: "testingredux-d677c",
  storageBucket: "testingredux-d677c.appspot.com",
  messagingSenderId: "230979200355",
  appId: "1:230979200355:web:cebdea9c39aac0198d1f56",
  measurementId: "G-84W2JXSSDY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = () => {
  console.log("Requesting User Permission...");

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");

      return getToken(messaging, {
        vapidKey:
          "BIiwgY4e48mAMZA-cHIwBPQOJQL1fsmeemc4m6GX7mxYYGdebCFrK4uePjegIUNIetPXHtEBVVk9xTDwYlCU5HU",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Client Token:", currentToken);
          } else {
            console.log("Failed to generate the app registration token.");
          }
        })
        .catch((error) => {
          console.log("An error occurred:", error);
        });
    } else {
      console.log("Notification permission denied.");
    }
  });
};

requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
