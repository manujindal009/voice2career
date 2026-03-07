import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Cpu,
  Sigma,
  Database,
  Network,
  Users,
  BarChart,
  Calculator,
  Brain,
  Puzzle,
  MessageSquareText,
} from "lucide-react";
console.log("🔥 STUDY.TSX RENDERED");

/*
  SINGLE SOURCE OF TRUTH
  - SAME UI for main + aptitude
  - NO folder icons
  - EXACT Study Materials style
*/

const STUDY_FOLDERS = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Arrays, Linked List, Stack, Queue, Trees, Graphs",
    icon: Cpu,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "aptitude",
    title: "Aptitude",
    description: "Quantitative, Logical Reasoning, Verbal",
    icon: Sigma,
    color: "bg-green-50 text-green-600",
    children: [
      {
        id: "data-interpretation",
        title: "Data Interpretation",
        description: "Tables, graphs & caselets",
        icon: BarChart,
        color: "bg-indigo-50 text-indigo-600",
      },
      {
        id: "formulas",
        title: "Formulas PDF",
        description: "All important formulas",
        icon: Calculator,
        color: "bg-yellow-50 text-yellow-600",
      },
      {
        id: "guesstimates",
        title: "Guesstimates",
        description: "Estimation interview questions",
        icon: Brain,
        color: "bg-purple-50 text-purple-600",
      },
      {
        id: "puzzles",
        title: "Puzzles",
        description: "Logical reasoning puzzles",
        icon: Puzzle,
        color: "bg-pink-50 text-pink-600",
      },
      {
        id: "quantitative",
        title: "Quantitative Aptitude",
        description: "Maths for placements",
        icon: Sigma,
        color: "bg-green-50 text-green-600",
      },
      {
        id: "verbal",
        title: "Verbal Ability",
        description: "Grammar & comprehension",
        icon: MessageSquareText,
        color: "bg-orange-50 text-orange-600",
      },
    ],
  },
  {
    id: "dbms",
    title: "DBMS",
    description: "SQL, Normalization, Transactions",
    icon: Database,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "os",
    title: "Operating System",
    description: "Processes, Threads, Deadlocks",
    icon: Cpu,
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: "cn",
    title: "Computer Networks",
    description: "OSI, TCP/IP, HTTP, DNS",
    icon: Network,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    id: "hr",
    title: "HR / Behavioral",
    description: "HR Questions & Interview Prep",
    icon: Users,
    color: "bg-pink-50 text-pink-600",
  },
];

export default function Study() {
  const navigate = useNavigate();
  const { folder } = useParams();

  const currentFolder = folder
    ? STUDY_FOLDERS.find(f => f.id === folder)
    : null;

  const items = currentFolder?.children || STUDY_FOLDERS;

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl font-bold">
          {currentFolder ? currentFolder.title : "Study Materials"}
        </h1>
        <p className="text-gray-500 mt-1">
          Browse topic-wise study resources
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => {
          const Icon = item.icon;

          return (
            <Card
              key={item.id}
              onClick={() =>
                currentFolder
                  ? navigate(`/study/read?path=${currentFolder.id}/${item.id}`)
                  : navigate(`/study/${item.id}`)
              }
              className="cursor-pointer hover:shadow-lg transition"
            >
              <CardContent className="p-6">
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.description}
                </p>

                <p className="text-sm text-blue-600 mt-4 font-medium">
                  Open →
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
