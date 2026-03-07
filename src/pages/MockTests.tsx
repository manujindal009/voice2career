import { useNavigate } from "react-router-dom";
import {Target,Clock,ArrowRight,BarChart3,} from "lucide-react";

const TESTS = [
  {
    id: "easy-medium",
    title: "Easy Level Mock Test",
    duration: 15,
    questions: 25,
    level: "Easy",
    color: "green",
  },
  {
    id: "medium-hard",
    title: "Medium Level Mock Test",
    duration: 20,
    questions: 30,
    level: "Medium",
    color: "yellow",
  },
  {
    id: "hard",
    title: "Hard Level Mock Test",
    duration: 30,
    questions: 30,
    level: "Hard",
    color: "red",
  },
];

export default function MockTests() {
  const navigate = useNavigate();

  const colorMap: any = {
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      btn: "bg-green-600 hover:bg-green-700",
    },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      btn: "bg-yellow-600 hover:bg-yellow-700",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-600",
      btn: "bg-red-600 hover:bg-red-700",
    },
  };

  return (
    <div className="min-h-screen bg-white px-10 py-12">
      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Target className="h-8 w-8 text-red-600" />
          Mock Placement Tests
        </h1>
        <p className="text-gray-500 mt-2">
          Choose test difficulty and experience real placement pressure
        </p>
      </div>

      {/* TEST CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        {TESTS.map((test) => {
          const c = colorMap[test.color];

          return (
            <div
              key={test.id}
              className="bg-white rounded-2xl border p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              {/* ICON */}
              <div
                className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 ${c.bg}`}
              >
                <BarChart3 className={`h-7 w-7 ${c.text}`} />
              </div>

              {/* TITLE */}
              <h2 className="text-xl font-semibold mb-2">
                {test.title}
              </h2>

              {/* META */}
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {test.duration} minutes
                </div>
                <div>❓ {test.questions} questions</div>
                <div
                  className={`inline-block text-xs px-3 py-1 rounded-full ${c.bg} ${c.text}`}
                >
                  {test.level}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate(`/mock-tests/${test.id}/start`)}
                className={`w-full flex items-center justify-center gap-2 text-white py-3 rounded-xl font-medium transition ${c.btn}`}
              >
                Start Test
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
