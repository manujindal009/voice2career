const admin = require("firebase-admin");
const fs = require("fs");

// 🔐 Service Account Key
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/*
   🔥 CHANGE THIS VALUE EACH TIME
   "easy-medium"
   "medium"
   "hard"
*/
const difficulty = "hard";  

// 📂 Automatically reads correct file
const questions = JSON.parse(
  fs.readFileSync(`./${difficulty}.json`, "utf8")
);

async function upload() {
  try {
    const batch = db.batch();

    questions.forEach((q, index) => {
      const docRef = db
        .collection("mockQuestions")
        .doc(difficulty)
        .collection("questions")
        .doc(); // auto ID for each question

      batch.set(docRef, q);
    });

    await batch.commit();

    console.log(`✅ ${difficulty} Upload Complete`);
    console.log(`📦 Total Questions Uploaded: ${questions.length}`);
  } catch (error) {
    console.error("❌ Upload Failed:", error);
  }
}

upload();
