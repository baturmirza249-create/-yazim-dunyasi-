import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Yeni Soru Ekleme Fonksiyonu
export async function addNewQuestion(questionData) {
  try {
    await addDoc(collection(db, "questions"), {
      questionText: questionData.text,
      options: questionData.options,
      correctAnswer: questionData.correct,
      createdAt: new Date()
    });
    alert("Soru başarıyla eklendi!");
  } catch (error) {
    console.error("Soru eklenirken hata oluştu:", error);
    alert("Soru eklenemedi: " + error.message);
  }
}

// Yeni Karikatür veya Haber Ekleme Fonksiyonu
export async function addNewContent(collectionName, contentData) {
  try {
    await addDoc(collection(db, collectionName), {
      ...contentData,
      createdAt: new Date()
    });
    alert("İçerik başarıyla eklendi!");
  } catch (error) {
    console.error("İçerik eklenirken hata oluştu:", error);
    alert("İçerik eklenemedi: " + error.message);
  }
}
