import { auth, googleProvider, db, ADMIN_EMAIL } from "./firebase-config.js";
import { signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 1. Google ile Giriş Yap Fonksiyonu
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Kullanıcı ilk defa giriyorsa Firestore'a kaydedelim
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
        score: 0
      });
    }

    // Giriş başarılıysa dashboard'a yönlendir
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Giriş hatası:", error);
    alert("Giriş yapılırken bir hata oluştu: " + error.message);
  }
}

// 2. Çıkış Yap Fonksiyonu
export async function logoutUser() {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Çıkış hatası:", error);
  }
}

// 3. Oturum ve Admin Kontrolü (Her sayfa açıldığında çalışır)
export function checkAuthState(onUserLoggedIn) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Kullanıcı giriş yapmış
      const isAdmin = (user.email === ADMIN_EMAIL);
      if (onUserLoggedIn) onUserLoggedIn(user, isAdmin);
    } else {
      // Kullanıcı giriş yapmamışsa ve dashboard'daysa index'e at
      if (window.location.pathname.includes("dashboard.html")) {
        window.location.href = "index.html";
      }
    }
  });
}