import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

admin.initializeApp();

/**
 * 🔥 FREE PLAN FRIENDLY
 * Trigger when a new interview is created
 * Adds dummy feedback (no AI, no billing)
 */
export const onInterviewCreate = onDocumentCreated(
  "users/{userId}/interviews/{docId}",
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data();
    if (!data) return;

    await snap.ref.update({
      feedback: {
        strengths: "Clear communication",
        improvements: "Answer structure can be improved",
        score: 7,
        source: "manual-placeholder",
      },
      evaluatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
);
