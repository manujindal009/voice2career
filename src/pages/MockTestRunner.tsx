import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { generatePaper } from "@/utils/generatePaper";
import { Button } from "@/components/ui/button";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
console.log("🔥 MOCK TEST RUNNER FILE LOADED");
const TEST_TIME_MAP: any = {
  "easy-medium": 10 * 60, // 10 min
  medium: 15 * 60,        // 15 min
  hard: 20 * 60,          // 20 min
};



export default function MockTestRunner() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [review, setReview] = useState<boolean[]>([]);
const [loading, setLoading] = useState(true);


  const [timeLeft, setTimeLeft] = useState(0);


//   useEffect(() => {
//   if (!id) return;

//   const paper = generatePaper(id as any);
//   setQuestions(paper);
//   setAnswers(Array(paper.length).fill(-1));
// setReview(Array(paper.length).fill(false));
//   setTimeLeft(TEST_TIME_MAP[id] || 3600);
// }, [id]);
useEffect(() => {
  if (!id) return;

  const loadQuestions = async () => {
    try {
      setLoading(true);

      const snap = await getDocs(
        collection(db, "mockQuestions", id, "questions")
      );

      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

        // Proper Fisher-Yates shuffle
          const shuffled = [...data];

          for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
        // Decide question limit
        let limit = 30; // default

      if (id === "easy-medium") limit = 30;
      if (id === "medium-hard") limit = 30;
      if (id === "hard") limit = 30;

// Take only required number
const selectedQuestions = shuffled.slice(0, limit);

      setQuestions(selectedQuestions);
      setAnswers(Array(selectedQuestions.length).fill(-1));
      setReview(Array(selectedQuestions.length).fill(false));
      setTimeLeft(TEST_TIME_MAP[id] || 3600);

    } catch (err) {
      console.error("Error loading questions:", err);
    } finally {
      setLoading(false);
    }
  };

  loadQuestions();
}, [id]);


useEffect(() => {
  if (!timeLeft) return;

  const timer = setInterval(() => {
    setTimeLeft((t) => {
      if (t <= 1) {
        submitTest(); // auto submit
        return 0;
      }
      return t - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);


  if (loading) {
  return <div className="p-10 text-center">Loading test…</div>;
}

if (!questions.length) {
  return (
    <div className="p-10 text-center">
      No questions found for this test.
    </div>
  );
}


  const question = questions[currentIndex];
  const selected = answers[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const selectOption = (i: number) => {
    const copy = [...answers];
    copy[currentIndex] = i;
    setAnswers(copy);
  };

const getPaletteColor = (index: number) => {
  if (index === currentIndex) return "bg-green-600 text-white"; // current
  if (review[index]) return "bg-yellow-400 text-black";         // review
  if (answers[index] !== -1) return "bg-blue-500 text-white";   // answered
  return "bg-gray-200 text-gray-700";                           // not visited
};


const getUnansweredCount = () => {
  return answers.filter(a => a === -1).length;
};

  const submitTest = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });
    navigate("/result", {
      state: {
        score,
        total: questions.length,
        testId: id,
        questions,
        answers,
      },
    });
  };
  const handleSubmit = () => {
  const unanswered = answers.filter(a => a === -1).length;
  const marked = review.filter(r => r).length;
  const answered = answers.length - unanswered;

  const message = `
Total Questions: ${questions.length}
Answered: ${answered}
Unanswered: ${unanswered}
Marked for Review: ${marked}

Do you want to submit the test?
`;

  const confirmSubmit = window.confirm(message);
  if (!confirmSubmit) return;

  submitTest();
};


  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
     {/* TIMER HEADER */}
<div className="sticky top-0 bg-white border-b z-10">
  <div className="max-w-4xl mx-auto px-6 py-4">

    {/* TOP ROW */}
    <div className="flex justify-between mb-2">
      <span className="text-sm font-semibold capitalize">
        {question.section}
      </span>

      <span className="text-sm font-mono">
        {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </span>
    </div>
    <p className="text-xs text-gray-600 mt-2">
  Answered: {answers.filter(a => a !== -1).length} / {questions.length}
</p>



    {/* PROGRESS BAR */}
    <div className="h-2 bg-gray-200 rounded">
      <div
        className="h-2 bg-green-600 rounded transition-all"
        style={{
          width: `${
            (timeLeft / (TEST_TIME_MAP[id!] || 3600)) * 100
          }%`,
        }}
      />
    </div>

  </div>
</div>

{/* QUESTION PALETTE */}
<div className="flex flex-wrap gap-4 text-xs mb-4">
  <Legend color="bg-green-600" label="Current" />
  <Legend color="bg-blue-500" label="Answered" />
  <Legend color="bg-yellow-400" label="Marked for Review" />
  <Legend color="bg-gray-200" label="Not Visited" />
</div>

<div className="max-w-4xl mx-auto mt-6 mb-4">
  <div className="bg-white border rounded-2xl p-4 shadow-sm">
    <p className="text-sm font-semibold mb-3">
      Question Palette
    </p>

    <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
      {questions.map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentIndex(i)}
          className={`h-9 w-9 rounded text-sm font-medium transition
            ${getPaletteColor(i)}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  </div>
</div>


      {/* QUESTION */}
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-white border rounded-2xl p-8 shadow-sm">

          <h2 className="text-lg font-semibold mb-6">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((opt: string, i: number) => (
              <button
                key={i}
                onClick={() => selectOption(i)}
                className={`w-full text-left p-4 rounded-xl border transition
                  ${
                    selected === i
                      ? "bg-blue-50 border-blue-500"
                      : "hover:bg-gray-50"
                  }`}
              >
                <b>{String.fromCharCode(65 + i)}.</b> {opt}
              </button>
            ))}
          </div>
          <button
  onClick={() => {
    const copy = [...review];
    copy[currentIndex] = !copy[currentIndex];
    setReview(copy);
  }}
  className="mt-4 text-sm font-medium text-yellow-600"
>
  ⭐ Mark for Review
</button>


        </div>
      </div>
    
      {/* FOOTER */}
      <div className="max-w-4xl mx-auto flex justify-between mt-8 px-2">
        <Button
          variant="outline"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
        >
          Previous
        </Button>

        <Button
  onClick={
    isLast
      ? handleSubmit
      : () => setCurrentIndex((i) => i + 1)
  }
>
  {isLast ? "Submit Test" : "Next"}
</Button>

      </div>
    </div>
  );
}
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded ${color}`} />
      <span>{label}</span>
    </div>
  );
}
