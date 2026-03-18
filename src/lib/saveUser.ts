import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

export async function saveUser(provider) {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    // 🔥 NEW USER → full data save
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "Candidate",
      email: user.email || "",
      provider,
      createdAt: serverTimestamp(),
      plan: "Free",
      banned: false
    });
  } else {
    // 🔁 EXISTING USER → sirf login update
    await setDoc(userRef, {
      lastLoginDate: new Date()
    }, { merge: true });
  }
}