import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import softwareData from "@/data/software.json";
import { getRandomQuestions } from "@/utils/getRandomQuestions";
import { initAnswers } from "@/utils/initAnswers";
import { saveTestResult } from "@/lib/saveTestResult";

type Question = {
  id: number;
  question: string;
  sampleAnswer: string;
};

export default function Test() {
  const navigate = useNavigate();

  const questions: Question[] = useMemo(
    () => getRandomQuestions(softwareData.questions, 10),
    []
  );

  const [answers, setAnswers] = useState<string[]>(
    initAnswers(questions.length)
  );

  const handleChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
  const attempted = answers.filter(a => a.trim() !== "").length;

  await saveTestResult(questions.length, attempted);

  navigate("/result", {
    state: {
      total: questions.length,
      attempted,
    },
  });
};


  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "auto" }}>
      <h1>{softwareData.field} – Practice Test</h1>

      {questions.map((q, i) => (
        <div key={q.id} style={{ marginBottom: 30 }}>
          <h3>
            {i + 1}. {q.question}
          </h3>

          <textarea
            rows={4}
            style={{ width: "100%", padding: 10 }}
            placeholder="Write your answer here..."
            value={answers[i]}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Test</button>
    </div>
  );
}
