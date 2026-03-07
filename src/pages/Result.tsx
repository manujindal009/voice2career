import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";



export default function Result() {
  console.log("✅ RESULT PAGE LOADED");
  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams<{ id: string }>();
  const { user } = useAuth();

  const {
  score = 0,
  total = 0,
  testId: stateTestId,
  questions = [],
  answers = [],
} = state || {};

const finalTestId = stateTestId || params.id;



  const accuracy = total
    ? Math.round((score / total) * 100)
    : 0;

    // SECTION-WISE STATS
const sectionStats: Record<
  string,
  { correct: number; total: number }
> = {};

questions.forEach((q: any, i: number) => {
  if (!q.section) return;
  if (!sectionStats[q.section]) {
    sectionStats[q.section] = { correct: 0, total: 0 };
  }

  sectionStats[q.section].total++;

  if (answers[i] === q.answer) {
    sectionStats[q.section].correct++;
  }
});

// FIND WEAKEST SECTION
let weakestSection = "";
let lowestAccuracy = 100;

Object.entries(sectionStats).forEach(
  ([section, data]: any) => {
    const percent = Math.round(
      (data.correct / data.total) * 100
    );

    if (percent < lowestAccuracy) {
      lowestAccuracy = percent;
      weakestSection = section;
    }
  }
);
const savedKey = `mock_saved_${finalTestId}`;

const saveResult = async () => {
  if (!user) return;
  if (sessionStorage.getItem(savedKey)) return;


  await addDoc(
    collection(db, "users", user.uid, "mockTests"),
    {
      testId: finalTestId,
      score,
      total,
      accuracy,
      questions,   // ✅ MUST
      answers,     // ✅ MUST
      createdAt: serverTimestamp(),
    }
  );
  sessionStorage.setItem(savedKey, "true");

};


useEffect(() => {
  if (!user || !finalTestId) return;

  console.log("🔥 Saving mock test result to Firestore");
  saveResult();
}, [user]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-[420px] text-center">

        <div className="h-16 w-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          ✓
        </div>

        <h1 className="text-2xl font-bold">Test Completed 🎉</h1>
        <p className="text-gray-500 mb-6">
          Here’s how you performed
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <p className="text-sm text-gray-500">Score</p>
          <p className="text-4xl font-bold">
            {score} / {total}
          </p>
          <p className="text-green-600 text-sm">
            Accuracy: {accuracy}%
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
  <div className="bg-gray-50 rounded-xl p-4 text-center">
    <p className="text-sm text-gray-500">Correct</p>
    <p className="text-xl font-semibold text-green-600">
      {score}
    </p>
  </div>

  <div className="bg-gray-50 rounded-xl p-4 text-center">
    <p className="text-sm text-gray-500">Wrong</p>
    <p className="text-xl font-semibold text-red-600">
      {total - score}
    </p>
  </div>

  <div className="bg-gray-50 rounded-xl p-4 text-center">
    <p className="text-sm text-gray-500">Total</p>
    <p className="text-xl font-semibold">
      {total}
    </p>
  </div>
</div>

        {/* SECTION-WISE PERFORMANCE */}
<div className="bg-white border rounded-xl p-5 mb-6 text-left">
  <h2 className="text-sm font-semibold mb-4">
    Section-wise Performance
  </h2>

  <div className="space-y-2">
    {Object.entries(sectionStats).map(
      ([section, data]: any) => {
        const percent = Math.round(
          (data.correct / data.total) * 100
        );

        return (
          <div
            key={section}
            className="flex justify-between text-sm"
          >
            <span>{section}</span>
            <span>
              {data.correct}/{data.total} ({percent}%)
            </span>
          </div>
        );
      }
    )}
  </div>
</div>
{/* WEAKEST AREA */}
{weakestSection && (
  <div
  className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700 cursor-pointer hover:bg-red-100"
  onClick={() =>
    navigate(`/study-materials/${weakestSection.toLowerCase()}`)
  }
>
  Weakest Area: <b>{weakestSection}</b>
  <div className="text-xs mt-1 underline">
    Practice this topic →
  </div>
</div>

)}


        <Button
  className="w-full mb-3"
  onClick={() => navigate(`/marksheet/${finalTestId}`)}
>
  View Detailed Marksheet
</Button>


        <Button
          variant="outline"
          className="w-full mb-3"
         onClick={() =>
  navigate(`/mock-tests/${finalTestId}/start`)
}
        >
          Retry Test
        </Button>

        <Button
          variant="ghost"
          className="w-full"
          onClick={() => navigate("/app")}
        >
          Go to Dashboard
        </Button>

      </div>
    </div>
  );
}
