import { db } from "./firebase-config.js";
import { collection, getDocs, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 1. Firebase'den Soruları Çekme Fonksiyonu
export async function loadQuestions() {
  try {
    const querySnapshot = await getDocs(collection(db, "questions"));
    const questions = [];
    querySnapshot.forEach((doc) => {
      questions.push({ id: doc.id, ...doc.data() });
    });
    return questions;
  } catch (error) {
    console.error("Sorular yüklenirken hata oluştu:", error);
    return [];
  }
}

// 2. Kullanıcı Doğru Bildiğinde Puanını Güncelleme
export async function updateUserScore(userId, pointsToAdd) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      score: increment(pointsToAdd) // Mevcut puanın üzerine ekler
    });
  } catch (error) {
    console.error("Puan güncellenirken hata oluştu:", error);
  }
}