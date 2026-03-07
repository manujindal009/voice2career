import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
} from "firebase/firestore";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import {
  ArrowLeft,
  Clock,
  Calendar,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export default function InterviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [interview, setInterview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD FROM FIRESTORE ================= */

  useEffect(() => {
    if (!user || !id) return;

    const load = async () => {
      setLoading(true);
      const ref = doc(db, "users", user.uid, "interviews", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setInterview(snap.data());
      }

      setLoading(false);
    };

    load();
  }, [user, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading interview…
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="p-8">
        Interview not found
      </div>
    );
  }

  const score = interview.score || {
    quality: 0,
    communication: 0,
    confidence: 0,
    overall: 0,
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">
              Interview Report
            </h1>
            <p className="text-gray-500 mt-1">
              Detailed performance analysis
            </p>
          </div>

          <div className="flex gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(interview.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {interview.durationMinutes || 0} min
            </div>
          </div>
        </div>

        {/* OVERALL SCORE */}
        <Card className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50">
          <CardContent className="p-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">
                Overall Performance
              </p>
              <p className="text-5xl font-bold text-blue-600">
                {score.overall}/100
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {score.overall >= 80
                  ? "Excellent performance!"
                  : score.overall >= 60
                  ? "Good effort, keep improving"
                  : "Needs more practice"}
              </p>
            </div>

            <div className="w-full md:w-64">
              <Progress
                value={score.overall}
                className="h-3 [&>div]:bg-blue-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* META STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Meta
            label="Questions"
            value={`${interview.attempted}/${interview.total}`}
          />
          <Meta
            label="Completion"
            value={`${interview.completion}%`}
          />
          <Meta
            label="Practice Time"
            value={`${interview.durationMinutes} min`}
          />
          <Meta
            label="Status"
            value="Completed"
            icon={<CheckCircle2 className="text-green-600 h-4 w-4" />}
          />
        </div>

        {/* SCORE BREAKDOWN */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Score Breakdown
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Score label="Quality" value={score.quality} />
            <Score label="Communication" value={score.communication} />
            <Score label="Confidence" value={score.confidence} />
          </div>
        </div>

        {/* QUESTIONS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Questions & Answers
          </h2>

          <div className="space-y-6">
            {interview.answers.map((qa: any, idx: number) => (
              <Card key={idx}>
                <CardContent className="p-6 space-y-3">
                  <p className="font-medium">
                    Q{idx + 1}. {qa.question}
                  </p>
                  <p className="text-sm text-gray-600">
                    {qa.answer || "No answer recorded"}
                  </p>

                  {qa.score && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
                      <Mini label="Quality" value={qa.score.quality} />
                      <Mini label="Comm." value={qa.score.communication} />
                      <Mini label="Confidence" value={qa.score.confidence} />
                      <Mini label="Overall" value={qa.score.overall} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function Meta({ label, value, icon }: any) {
  return (
    <Card>
      <CardContent className="p-4 text-center space-y-1">
        <div className="flex justify-center">{icon}</div>
        <p className="text-xl font-semibold">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </CardContent>
    </Card>
  );
}

function Score({ label, value }: any) {
  return (
    <Card>
      <CardContent className="p-6 space-y-2">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-blue-600">
          {value}/100
        </p>
        <Progress value={value} className="[&>div]:bg-blue-600" />
      </CardContent>
    </Card>
  );
}

function Mini({ label, value }: any) {
  return (
    <div className="rounded-lg bg-gray-100 p-3 text-center">
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
