// Firebase SDK'larını CDN'den içe aktarıyoruz
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Kendi Firebase Console'dan aldığınız bilgileri buraya yapıştırın:
const firebaseConfig = {
  apiKey: "AIzaSyAQdPMLH-PsGFXG74XiUTTz5CnOkKNheas",
  authDomain: "yazimdunyasi-b6889.firebaseapp.com",
  projectId: "yazimdunyasi-b6889",
  storageBucket: "yazimdunyasi-b6889.firebasestorage.app",
  messagingSenderId: "144298988449",
  appId: "1:144298988449:web:14ade80f5358557614b1e0",
  measurementId: "G-DESLB9C7GZ"
};

// Firebase uygulamasını başlatıyoruz
const app = initializeApp(firebaseConfig);

// Kimlik doğrulama (Auth), Google sağlayıcısı ve Veritabanı (Firestore) nesnelerini dışarı aktarıyoruz
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const ADMIN_EMAIL = "baturmirza249@gmail.com"; // Buraya kendi admin e-postanızı yazacaksınız