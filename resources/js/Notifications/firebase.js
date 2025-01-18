// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBeLx5qTZHJK5kAK3essJ5_r85aGYBs_RE",
  authDomain: "cokolend-24034.firebaseapp.com",
  projectId: "cokolend-24034",
  storageBucket: "cokolend-24034.firebasestorage.app",
  messagingSenderId: "631252094042",
  appId: "1:631252094042:web:69e986376770e1a312dc63",
  measurementId: "G-1F0X2EP4J5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Generate token for the user
export const generateToken = async () => {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        try {
            const token = await getToken(messaging, {
                vapidKey: "BP6UTZZzvejAF6y5mci7DrB0RHrdxpbFnGCOEYVUsVhdaWhccY9KdwWG-f1Re8V-6EFSHS5GqRp9gfytMGhwg0Q"
            });
            return { token };
        } catch (error) {
            console.error('Error generating token:', error);
            return null;
        }
    }
    return null;
}
