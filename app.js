import { loginWithGoogle, logoutUser, checkAuthState } from "./auth.js";
import { loadQuestions, updateUserScore } from "./quiz.js";
import { addNewQuestion } from "./admin.js";

// Sayfa yüklendiğinde çalışacak ana kodlar
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Giriş Sayfası İşlemleri (index.html)
  const googleLoginBtn = document.getElementById("googleLoginBtn");
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", () => {
      loginWithGoogle();
    });
  }

  // 2. Dashboard (Ana Panel) Sayfası İşlemleri (dashboard.html)
  if (window.location.pathname.includes("dashboard.html")) {
    
    // Kullanıcı oturum ve admin yetki kontrolü
    checkAuthState((user, isAdmin) => {
      console.log("Giriş yapan kullanıcı:", user.displayName);
      
      // Kullanıcı adını ekranda göster (Eğer HTML'de user-name ID'li eleman varsa)
      const userNameEl = document.getElementById("userName");
      if (userNameEl) userNameEl.textContent = user.displayName;

      // Eğer kullanıcı Admin ise, yönetim panelini görünür yap
      if (isAdmin) {
        const adminSection = document.getElementById("adminSection");
        if (adminSection) adminSection.style.display = "block";
      }
    });

    // Çıkış yap butonunu dinle
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        logoutUser();
      });
    }

    // Admin Soru Ekleme Formunu Dinle (Eğer varsa)
    const questionForm = document.getElementById("questionForm");
    if (questionForm) {
      questionForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const text = document.getElementById("questionText").value;
        const options = [
          document.getElementById("opt1").value,
          document.getElementById("opt2").value,
          document.getElementById("opt3").value,
          document.getElementById("opt4").value
        ];
        const correct = parseInt(document.getElementById("correctOpt").value);

        await addNewQuestion({ text, options, correct });
        questionForm.reset();
      });
    }
    
    // Quiz sorularını yükle ve ekrana getir (Örnek çağrı)
    loadQuestions().then(questions => {
      console.log("Yüklenen sorular:", questions);
      // Burada soruları ekrana basma döngüsünü kuracağız
    });
  }
});