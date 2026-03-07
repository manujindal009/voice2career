import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import {
  ArrowLeft,
  Calendar,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function InterviewHistory() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD FROM FIRESTORE ================= */

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      setLoading(true);

      const q = query(
        collection(db, "users", user.uid, "interviews"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setInterviews(data);
      setLoading(false);
    };

    load();
  }, [user]);

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h1 className="text-3xl font-bold">Interview History</h1>
        <p className="text-gray-500 mt-1">
          Review your past interview performances
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto space-y-6">
        {loading && (
          <p className="text-gray-400 text-center">
            Loading interviews…
          </p>
        )}

        {!loading && interviews.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No interviews found.  
            <br />
            Start your first mock interview 🚀
          </div>
        )}

        {interviews.map((i) => (
          <Card
            key={i.id}
            className="hover:shadow-md transition cursor-pointer"
            onClick={() => navigate(`/history/${i.id}`)}
          >
            <CardContent className="p-6 space-y-4">
              {/* TOP ROW */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {new Date(i.date).toLocaleString()}
                </div>

                <span className="text-sm font-medium text-blue-600">
                  View Details →
                </span>
              </div>

              {/* SCORE */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Overall Score
                    </p>
                    <p className="text-xl font-semibold">
                      {i.score?.overall ?? 0}/100
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {i.durationMinutes || 0} min
                </div>
              </div>

              {/* COMPLETION */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>
                    {i.attempted}/{i.total} Questions Attempted
                  </span>
                  <span>{i.completion}%</span>
                </div>
                <Progress
                  value={i.completion}
                  className="[&>div]:bg-blue-600"
                />
              </div>
              {/* ANSWERED vs SKIPPED */}
<div className="mt-4 space-y-2">

  {/* Answered */}
  <div className="flex justify-between text-xs text-gray-500">
    <span>Answered</span>
    <span>{i.attempted}</span>
  </div>

  <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
    <div
      className="h-full bg-green-600"
      style={{
        width: `${Math.round(
          (i.attempted / i.total) * 100
        )}%`,
      }}
    />
  </div>
  <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
  <div
    className="h-full bg-red-500"
    style={{
      width: `${Math.round(
        ((i.total - i.attempted) / i.total) * 100
      )}%`,
    }}
  />
</div>


  {/* Skipped */}
  <div className="flex justify-between text-xs text-gray-500">
    <span>Skipped</span>
    <span>{i.total - i.attempted}</span>
  </div>

</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
