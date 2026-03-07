import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Home,
  Sparkles,
} from "lucide-react";

export default function InterviewCompleted() {
  const navigate = useNavigate();

  const data = JSON.parse(
    localStorage.getItem("latestInterview") || "{}"
  );

  const answered = data.attempted || 0;
  const total = data.total || 5;
  const score = data.score?.overall || 0;

  const completion = Math.round(
    (answered / total) * 100
  );

  const feedback =
    score >= 80
      ? "Excellent performance!"
      : score >= 60
      ? "Good effort, keep improving"
      : "Practice more to improve";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-10 text-center space-y-8">

          {/* ICON */}
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle2 className="h-14 w-14 text-green-600" />
            </div>
          </div>

          {/* TITLE */}
          <div>
            <h1 className="text-3xl font-bold">
              Interview Completed
            </h1>
            <p className="text-gray-500 mt-1">
              {feedback}
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4">
            <Stat
              label="Questions Answered"
              value={`${answered}/${total}`}
            />
            <Stat
              label="Completion"
              value={`${completion}%`}
            />
          </div>

          {/* SCORE */}
          <div className="rounded-xl border bg-blue-50 p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold">
                Overall Score
              </p>
              <Sparkles className="h-5 w-5 text-blue-600" />
            </div>

            <p className="text-4xl font-bold text-blue-600 mb-3">
              {score}/100
            </p>

            <Progress
              value={score}
              className="h-2 [&>div]:bg-blue-600"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/app")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </button>

        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- helpers ---------- */

function Stat({ label, value }: any) {
  return (
    <div className="rounded-lg bg-gray-100 p-4 text-center">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
