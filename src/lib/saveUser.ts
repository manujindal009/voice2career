import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function saveUser(
  provider: "google" | "email"
) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: user.displayName || "Candidate",
        email: user.email || null,
        provider,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch {
    // ❌ kuch bhi throw nahi karna
  }
}
