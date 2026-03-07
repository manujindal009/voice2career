import { useNavigate, useParams } from "react-router-dom";
import { Clock, FileText, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MockTestIntro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const configMap: any = {
    "easy-medium": {
      title: "Easy → Medium Mock Test",
      time: "60 minutes",
      questions: 25,
    },
    medium: {
      title: "Medium Mock Test",
      time: "75 minutes",
      questions: 30,
    },
    hard: {
      title: "Hard Mock Test",
      time: "90 minutes",
      questions: 35,
    },
  };

  const config = configMap[id!];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">
          {config.title}
        </h1>
        <p className="text-gray-500 mb-6">
          Read the instructions carefully before starting the test
        </p>

        {/* INFO */}
        <div className="space-y-4 mb-8">
          <Info icon={<Clock />} text={`Duration: ${config.time}`} />
          <Info icon={<FileText />} text={`Total Questions: ${config.questions}`} />
          <Info
            icon={<Layers />}
            text="Sections: Aptitude, Logical, CS Fundamentals, DSA"
          />
        </div>

        {/* RULES */}
        <ul className="text-sm text-gray-600 space-y-2 mb-8 list-disc pl-5">
          <li>Each question carries 1 mark</li>
          <li>No negative marking</li>
          <li>You can navigate between questions</li>
          <li>Do not refresh the page during the test</li>
        </ul>

        <Button
          className="w-full text-lg py-5"
          onClick={() => navigate(`/mock-tests/${id}/start`)}
        >
          Start Test
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Info({ icon, text }: any) {
  return (
    <div className="flex items-center gap-3 text-gray-700">
      <span className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-100">
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}
