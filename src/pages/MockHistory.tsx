import { useNavigate } from "react-router-dom";
import { Folder, Clock, ArrowRight } from "lucide-react";

const HISTORY = [
  {
    id: "easy-medium",
    title: "Easy Test History",
    desc: "View all attempts of Easy mock tests",
    level: "Easy",
    color: "green",
  },
  {
    id: "medium-hard",
    title: "Medium Test History",
    desc: "View all attempts of Medium mock tests",
    level: "Medium",
    color: "yellow",
  },
  {
    id: "hard",
    title: "Hard Test History",
    desc: "View all attempts of Hard mock tests",
    level: "Hard",
    color: "red",
  },
];

export default function MockHistory() {
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

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-2 left-4 z-[9999] bg-transparent border border-gray-200 px-2 py-1 rounded-xl hover:bg-gray-100"
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          📂 Mock Test History
        </h1>
        <p className="text-gray-500 mt-2">
          Browse your previous mock test attempts by difficulty
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">

        {HISTORY.map((test) => {
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
                <Folder className={`h-7 w-7 ${c.text}`} />
              </div>

              {/* TITLE */}
              <h2 className="text-xl font-semibold mb-2">
                {test.title}
              </h2>

              {/* DESC */}
              <p className="text-gray-500 text-sm mb-6">
                {test.desc}
              </p>

              {/* LEVEL TAG */}
              <div
                className={`inline-block text-xs px-3 py-1 rounded-full mb-6 ${c.bg} ${c.text}`}
              >
                {test.level}
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate(`/marksheet/${test.id}`)}
                className={`w-full flex items-center justify-center gap-2 text-white py-3 rounded-xl font-medium transition ${c.btn}`}
              >
                Open History
                <ArrowRight className="h-4 w-4" />
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
}