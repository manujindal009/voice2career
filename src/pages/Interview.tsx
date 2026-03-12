import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const SPEAK = (text: string) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 1;
  utter.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const female = voices.find(v =>
    v.lang.includes("en") && v.name.toLowerCase().includes("female")
  );
  if (female) utter.voice = female;

  window.speechSynthesis.speak(utter);
};

export default function Interview() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recognition = useRef<any>(null);

  const [questions, setQuestions] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(60);
  const [interviewId, setInterviewId] = useState<string>("");

  /* 🎥 CAMERA START */
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;

        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.start();
      });
  }, []);

  /* 🎤 SPEECH TO TEXT */
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    recognition.current = new SpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.interimResults = true;
    recognition.current.lang = "en-US";

    recognition.current.onresult = (e: any) => {
      let text = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      setAnswer(text);
    };

    recognition.current.start();
  }, []);

  /* ⏱ TIMER */
  useEffect(() => {
    if (timer <= 0) handleNext();
    const i = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(i);
  }, [timer]);

  /* 🔥 LOAD QUESTIONS + CREATE INTERVIEW */
  useEffect(() => {
    if (!user) return;

    const startInterview = async () => {
      const qSnap = await getDocs(collection(db, "pyqs"));
      const qs = qSnap.docs.map(d => d.data().question).slice(0, 3);
      setQuestions(qs);

      const interviewRef = await addDoc(
        collection(db, "users", user.uid, "interviews"),
        {
          questionCount: qs.length,
          answeredCount: 0,
          status: "in_progress",
          createdAt: serverTimestamp(),
        }
      );

      setInterviewId(interviewRef.id);

      setTimeout(() => {
        SPEAK(`Hello, I am Ms Kapoor. ${qs[0]}`);
      }, 800);
    };

    startInterview();
  }, [user]);

  /* ➡ NEXT QUESTION */
  const handleNext = async () => {
    if (!user) return;

    await addDoc(
      collection(
        db,
        "users",
        user.uid,
        "interviews",
        interviewId,
        "questions"
      ),
      {
        question: questions[current],
        answer,
        createdAt: serverTimestamp(),
      }
    );

    setAnswer("");
    setTimer(60);

    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setTimeout(() => {
        SPEAK(questions[current + 1]);
      }, 500);
    } else {
      finishInterview();
    }
  };

  /* ❌ END INTERVIEW */
  const finishInterview = async () => {
    if (!user) return;

    await updateDoc(
      doc(db, "users", user.uid, "interviews", interviewId),
      {
        answeredCount: questions.length,
        status: "completed",
      }
    );

    recognition.current?.stop();
    mediaRecorder.current?.stop();
    window.speechSynthesis.cancel();

    navigate("/app");
  };

  if (!questions.length) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading interview...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center">
      {/* Interviewer */}
      <img
        src="/interviewer.jpg"
        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover mb-3"
      />
      <p className="font-semibold">Ms. Kapoor (Interviewer)</p>

      <p className="mt-2 text-sm text-muted-foreground">
        Question {current + 1} of {questions.length}
      </p>

      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 text-center">
        {questions[current]}
      </h1>

      <p className="text-red-500 font-semibold mt-2">
        ⏱ {timer}s
      </p>

      {/* Answer */}
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        placeholder="Speak your answer..."
        className="mt-4 w-full max-w-xl h-32 sm:h-36 border rounded-md p-3 text-sm sm:text-base"
      />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 w-full max-w-xl">
        <button
          onClick={handleNext}
          className="px-5 py-2 rounded-md bg-gray-200"
        >
          Skip
        </button>
        <button
          onClick={finishInterview}
          className="px-5 py-2 rounded-md bg-red-500 text-white"
        >
          End Interview
        </button>
      </div>

      {/* User Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        className="fixed bottom-3 right-3 w-24 sm:w-32 md:w-40 rounded-lg border shadow-lg"
      />
    </div>
  );
}