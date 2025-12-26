import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export async function saveTestResult(
  total: number,
  attempted: number
) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  const ref = collection(db, "users", user.uid, "attempts");

  await addDoc(ref, {
    totalQuestions: total,
    attemptedQuestions: attempted,
    createdAt: serverTimestamp(),
  });
}
