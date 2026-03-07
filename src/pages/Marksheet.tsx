import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

export default function Marksheet() {
  const navigate = useNavigate();
  const { testId } = useParams<{ testId: string }>();
  const { user } = useAuth();

  const [attempts, setAttempts] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !testId) return;

    const loadAttempts = async () => {
      try {
        const q = query(
          collection(db, "users", user.uid, "mockTests"),
          orderBy("createdAt", "asc")
        );

        const snap = await getDocs(q);
        const all = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        const filtered = all.filter(
          (doc: any) => doc.testId === testId
        );

        setAttempts(filtered);
        setSelectedIndex(0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAttempts();
  }, [user, testId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading marksheet...
      </div>
    );
  }

  if (!attempts || attempts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No marksheet data found
      </div>
    );
  }

  const attempt =
    attempts[selectedIndex] ?? attempts[0];

  if (!attempt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Something went wrong
      </div>
    );
  }

  const correct = attempt.score ?? 0;
  const total = attempt.total ?? 0;
  const wrong = total - correct;
  const accuracy = attempt.accuracy ?? 0;

  return (
  <div className="min-h-screen bg-white-900 px-10 py-12">

    {/* HEADER */}
    <div className="max-w-7xl mx-auto mb-10 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight capitalize">
          {testId?.replace("-", " ")} — Marksheet
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Review your mock test performance
        </p>
      </div>

      <Button
        className="bg-emerald-600 hover:bg-emerald-700 text-white"
        onClick={() => navigate("/app")}
      >
        Back to Dashboard
      </Button>
    </div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* LEFT SIDE - ATTEMPTS */}
      <div className="space-y-5">
        {attempts.map((a, i) => (
          <Card
            key={a.id}
            onClick={() => setSelectedIndex(i)}
            className={`cursor-pointer transition-all rounded-2xl ${
              i === selectedIndex
                ? "border-blue-500 shadow-lg bg-white"
                : "hover:shadow-md bg-white"
            }`}
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">
                    Attempt {i + 1}
                  </p>
                  <p className="text-sm text-gray-500">
                    Score: {a.score}/{a.total}
                  </p>
                  <p className="text-sm text-gray-500">
                    Accuracy: {a.accuracy}%
                  </p>
                </div>

                <div className="text-sm text-gray-400">
                  →
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="md:col-span-2 space-y-8">

        {/* PERFORMANCE SUMMARY */}
        <Card className="rounded-2xl shadow-sm bg-white">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-xl font-semibold">
              Performance Summary
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold">
                  {attempt.score}/{attempt.total}
                </p>
                <p className="text-green-600 font-medium mt-1">
                  Accuracy: {attempt.accuracy}%
                </p>
              </div>

              {
  (() => {
    const radius = 54;
    const stroke = 10;
    const normalizedRadius = radius - stroke * 0.5;
    const circumference =
      normalizedRadius * 2 * Math.PI;

    const progress =
      attempt.accuracy || 0;

    const strokeDashoffset =
      circumference -
      (progress / 100) * circumference;

    let color = "#22c55e"; // green

    if (progress < 60) {
      color = "#ef4444"; // red
    } else if (progress < 80) {
      color = "#eab308"; // yellow
    }

    return (
      <svg
        height={radius * 2}
        width={radius * 2}
        //className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 0.5s ease",
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />

        {/* Text */}
        <text
  x="50%"
  y="50%"
  textAnchor="middle"
  dominantBaseline="central"
  className="text-xl font-bold"
  fill={color}
>
  {progress}%
</text>
      </svg>
    );
  })()
}

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-emerald-500 h-3 rounded-full transition-all"
                style={{ width: `${attempt.accuracy}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* DETAILED QUESTIONS */}
        <Card className="rounded-2xl shadow-sm bg-white">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-8">
              Detailed Marksheet
            </h2>

            {attempt.questions?.map((q: any, idx: number) => {
              const isCorrect =
                attempt.answers?.[idx] === q.answer;

              return (
                <div
                  key={idx}
                  className="mb-8 p-6 rounded-2xl bg-gray-50 border"
                >
                  <p className="font-medium text-base mb-4">
                    Q{idx + 1}. {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options?.map(
                      (opt: string, i: number) => {
                        const correctOption =
                          i === q.answer;
                        const selected =
                          i === attempt.answers?.[idx];

                        return (
                          <div
                            key={i}
                            className={`p-3 rounded-lg text-sm transition ${
                              correctOption
                                ? "bg-green-100 border border-green-300"
                                : selected
                                ? "bg-red-100 border border-red-300"
                                : "bg-white border"
                            }`}
                          >
                            <span className="font-medium mr-2">
                              {String.fromCharCode(
                                65 + i
                              )}
                              .
                            </span>
                            {opt}
                          </div>
                        );
                      }
                    )}
                  </div>

                  <p
                    className={`mt-4 font-medium ${
                      isCorrect
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {isCorrect
                      ? "Correct Answer"
                      : "Incorrect Answer"}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>

      </div>
    </div>
  </div>
);
}