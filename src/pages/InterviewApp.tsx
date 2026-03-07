import { useEffect, useRef, useState } from "react";
import { QUESTION_BANK } from "@/data/questionBank";
import { getRandomQuestions } from "@/utils/questionPicker";
import { useNavigate } from "react-router-dom";
import { INTRO_QUESTIONS} from "@/data/questionBank";
import { calculateInterviewScore } from "@/utils/interviewScoring";
import { calculateFinalInterviewScore } from "@/utils/interviewScoring";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

type Phase = "countdown" | "interview" | "completed";

const QUESTIONS = [
  "Tell me about yourself and your background.",
  "What are your strengths?",
  "Describe a challenge you faced.",
  "Why should we hire you?",
  "Where do you see yourself in 5 years?",
];

const SpeechRecognition =
  (window as any).SpeechRecognition ||
  (window as any).webkitSpeechRecognition;

export default function InterviewApp() {
  const navigate = useNavigate();
  const { user } = useAuth(); // 🔥 ADD

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const questionsRef = useRef<string[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);

  // 🔴 EXISTING
  const recordedChunksRef = useRef<BlobPart[]>([]);
  const transcriptRef = useRef("");
  const answersRef = useRef<
  {
    question: string;
    answer: string;
    score?: any;
  }[]
>([]);

  const interviewStartTimeRef = useRef<number>(0);

  // 🟢 EXISTING
  const uploadPromiseRef = useRef<Promise<string | null> | null>(null);

  const [phase, setPhase] = useState<Phase>("countdown");
  const [countdown, setCountdown] = useState(10);
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [answers, setAnswers] = useState<
    { question: string; answer: string; score?: any }[]
  >([]);
  // 🔥 FINAL SCORE STATE (UI overwrite bug fix)
const [finalResult, setFinalResult] = useState({
  quality: 0,
  communication: 0,
  confidence: 0,
  overall: 0,
});


  /* ---------------- COUNTDOWN ---------------- */
  useEffect(() => {
    if (phase !== "countdown") return;

    if (countdown === 0) {
  interviewStartTimeRef.current = Date.now();

  // 🔥 STEP 1: Intro questions (2 ya 3)
  const introCount = 3;
  const introQs = INTRO_QUESTIONS.slice(0, introCount);

  // 🔥 STEP 2: Remaining random questions
  const remainingCount = 10 - introQs.length;
  const randomQs = getRandomQuestions(
    QUESTION_BANK,
    remainingCount
  );

  // 🔥 STEP 3: FINAL ORDER LOCK
  questionsRef.current = [...introQs, ...randomQs];

  startMedia();
  startSpeechRecognition();
  setPhase("interview");
  return;
}


    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, phase]);

  /* ---------------- QUESTION TIMER ---------------- */
  useEffect(() => {
    if (phase !== "interview") return;

    if (timeLeft === 0) {
      nextQuestion(true);
      return;
    }

    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase]);

  /* ---------------- MEDIA ---------------- */
  async function startMedia() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    streamRef.current = stream;

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;
      await videoRef.current.play();
    }

    recorderRef.current = new MediaRecorder(stream);

    recorderRef.current.ondataavailable = e => {
      if (e.data.size > 0) recordedChunksRef.current.push(e.data);
    };

    recorderRef.current.onstop = () => {
      uploadPromiseRef.current = (async () => {
        if (recordedChunksRef.current.length === 0) return null;

        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });

        try {
          const storage = getStorage();
          const refPath = storageRef(
            storage,
            `interviews/${Date.now()}/recording.webm`
          );
          await uploadBytes(refPath, blob);
          return await getDownloadURL(refPath);
        } catch {
          return null;
        }
      })();
    };

    recorderRef.current.start();
  }

  function stopMedia() {
    recorderRef.current?.stop();
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
  }

  /* ---------------- SPEECH ---------------- */
  function startSpeechRecognition() {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (e: any) => {
      let text = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      transcriptRef.current = text.trim();
      setCurrentTranscript(text.trim());
    };

    recognition.onerror = () => recognition.stop();
    recognition.start();
    recognitionRef.current = recognition;
  }

  function stopSpeechRecognition() {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  }

  /* ---------------- ANSWER SAVE ---------------- */
 function pushAnswer(skipped = false) {
  const text = transcriptRef.current.trim();

  // ⛔ Skip OR kuch bola hi nahi → DO NOTHING
  if (skipped || text.length === 0) {
    transcriptRef.current = "";
    setCurrentTranscript("");
    return;
  }

  const score = calculateInterviewScore([
    { question: questionsRef.current[qIndex], answer: text },
  ]);

  answersRef.current.push({
    question: questionsRef.current[qIndex],
    answer: text,
    score,
  });

  setAnswers([...answersRef.current]);

  transcriptRef.current = "";
  setCurrentTranscript("");
}



  function nextQuestion(fromAuto = false) {
  stopSpeechRecognition();
  pushAnswer(fromAuto);

  if (qIndex + 1 === questionsRef.current.length) {
    endInterview(true);
  } else {
    setQIndex(i => i + 1);
    setTimeLeft(60);
    startSpeechRecognition();
  }
}


  /* ---------------- END INTERVIEW ---------------- */
  async function endInterview(fromAuto = false) {
    stopSpeechRecognition();
    stopMedia();

    if (!fromAuto) pushAnswer();

    const durationMs = Date.now() - interviewStartTimeRef.current;
    const durationMinutes = Math.max(1, Math.round(durationMs / 60000));

    const realAnswers = answersRef.current;

    const finalScore =
  realAnswers.length > 0
    ? calculateFinalInterviewScore(
        realAnswers,
        questionsRef.current.length
      )
    : { quality: 0, communication: 0, confidence: 0, overall: 0 };
    // 🔥 STEP-B ADD (safety fallback)
if (
  finalScore.overall === 0 &&
  realAnswers.length > 0
) {
  finalScore.overall = Math.min(
    35,
    finalScore.quality || 20
  );
}


// 🔥 IMPORTANT: UI ke liye final score save
setFinalResult(finalScore);


    const videoURL = uploadPromiseRef.current
      ? await uploadPromiseRef.current
      : null;

    const interview = {
      date: new Date().toISOString(),
      attempted: answersRef.current.length,
      total: questionsRef.current.length,
      completion: Math.round(
  (answersRef.current.length / questionsRef.current.length) * 100
),
      answers: answersRef.current,
      score: finalScore,
      durationMinutes,
      videoURL,
    };

    // 🔥 ADD: SAVE TO FIRESTORE (PERMANENT)
    if (user) {
      await addDoc(
        collection(db, "users", user.uid, "interviews"),
        {
          ...interview,
          createdAt: serverTimestamp(),
        }
      );
    }

    // 🔴 EXISTING localStorage (UNCHANGED)
    const prev = JSON.parse(localStorage.getItem("interviews") || "[]");
    localStorage.setItem(
      "interviews",
      JSON.stringify([{ ...interview, id: Date.now() }, ...prev])
    );

    localStorage.setItem(
  "latestInterview",
  JSON.stringify({
    attempted: interview.attempted,
    total: interview.total,
    score: interview.score,
  })
);


    setPhase("completed");

  }

  /* ---------------- CLEANUP ---------------- */
  useEffect(() => {
    return () => {
      stopSpeechRecognition();
      stopMedia();
    };
  }, []);

  /* ---------------- UI ---------------- */
  if (phase === "countdown") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="rounded-xl border bg-card p-10 shadow-xl text-center space-y-4">
          <h1 className="text-2xl font-bold">Interview will start in</h1>
          <p className="text-5xl font-mono font-bold text-blue-600">
            {countdown}s
          </p>
        </div>
      </div>
    );
  }

  if (phase === "completed") {
 const attempted = answersRef.current.length;
  const total = questionsRef.current.length;
  const completion = Math.round((attempted / total) * 100);

  const realAnswers = answersRef.current;

  // 🔥 FIX: dobara score calculate nahi karna
const finalScore = finalResult;


  const breakdown = [
    { label: "Speech Clarity", value: Math.max(0, finalScore.overall - 5) },
    { label: "Grammar", value: Math.max(0, finalScore.overall - 8) },
    { label: "Vocabulary", value: Math.max(0, finalScore.overall - 3) },
    { label: "Confidence", value: finalScore.overall },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gradient-to-br from-background to-secondary">
      <div className="w-full max-w-2xl rounded-2xl border bg-card p-8 shadow-xl text-center space-y-8">
        
        {/* SUCCESS ICON */}
        <div className="flex justify-center">
          <div className="rounded-full bg-green-500/20 p-4">
            <svg
              className="h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* TITLE */}
        <div>
          <h1 className="text-3xl font-bold">Interview Completed!</h1>
          <p className="text-muted-foreground">
            Great job! Your interview has been recorded.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-secondary p-4">
            <p className="text-2xl font-bold">
              {attempted}/{total}
            </p>
            <p className="text-xs text-muted-foreground">
              Questions Answered
            </p>
          </div>

          <div className="rounded-lg bg-secondary p-4">
            <p className="text-2xl font-bold">{completion}%</p>
            <p className="text-xs text-muted-foreground">
              Completion
            </p>
          </div>
        </div>

        {/* OVERALL SCORE */}
        <div className="rounded-lg border bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-6">
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold">Overall Performance</h3>
          </div>

          <p className="text-4xl font-bold text-blue-600 mb-2">
            {finalScore.overall}/100
          </p>

          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all"
              style={{ width: `${finalScore.overall}%` }}
            />
          </div>
        </div>

        {/* BREAKDOWN */}
        <div className="space-y-2 text-left">
          <h3 className="font-semibold">Performance Breakdown</h3>

          {breakdown.map(b => (
            <div
              key={b.label}
              className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
            >
              <span className="text-sm">{b.label}</span>
              <span className="font-semibold">{b.value}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/app")}
          className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

  return (
    <div className="relative min-h-screen bg-black">
      <img
        src="/interviewer.jpg"
        alt="Interviewer"
        className="h-screen w-full object-cover"
      />

      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold">{questionsRef.current[qIndex]}</h2>
        <p className="text-sm text-muted-foreground">
          Question {qIndex + 1} / {questionsRef.current.length}
        </p>
        <p className="mt-2 text-sm">Time Left: {timeLeft}s</p>
        <div className="mt-3 rounded-md bg-gray-100 p-2 text-sm">
          <span className="font-medium">You said:</span>{" "}
          {currentTranscript || "Listening..."}
        </div>
      </div>

      <div className="absolute bottom-6 right-6 h-40 w-56 rounded-lg overflow-hidden border-2 border-green-500 bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute bottom-6 left-6">
        <div className="flex items-center gap-2 rounded-full border border-red-500 bg-red-500/10 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-semibold text-red-600">
            Recording…
          </span>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
        <button
          onClick={() => nextQuestion(false)}
          className="rounded-lg bg-green-600 px-6 py-3 text-white font-semibold"
        >
          Submit
        </button>
        <button
          onClick={() => nextQuestion(true)}
          className="rounded-lg bg-white px-6 py-3 font-semibold"
        >
          Skip Question
        </button>
        <button
          onClick={() => endInterview(false)}
          className="rounded-lg bg-red-600 px-6 py-3 text-white font-semibold"
        >
          End Interview
        </button>
      </div>
    </div>
  );
}
