import { useState } from "react";
import { Hero } from "@/components/Hero";
import { InterviewSetup } from "@/components/InterviewSetup";
import { InterviewPractice } from "@/components/InterviewPractice";
import { FeedbackDisplay } from "@/components/FeedbackDisplay";
import { Loader2 } from "lucide-react";

type AppState = "hero" | "setup" | "practice" | "loading" | "feedback";

interface InterviewData {
  interviewType: string;
  field: string;
  jobTitle: string;
}

interface Answer {
  question: string;
  answer: string;
}

interface Feedback {
  mistakes: string[];
  improvements: string[];
  evaluation: {
    clarity: string;
    confidence: string;
    readiness: string;
  };
  sampleAnswer: string;
  encouragement: string;
}

const Index = () => {
  const [state, setState] = useState<AppState>("hero");
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleSetupComplete = (data: InterviewData) => {
    setInterviewData(data);
    setState("practice");
  };

  const generateFeedback = async (answers: Answer[]) => {
    setState("loading");
    
    // Simulate AI processing (in production, this would call the AI edge function)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock feedback based on answers
    const mockFeedback: Feedback = {
      mistakes: [
        "Responses could be more structured using the STAR method (Situation, Task, Action, Result).",
        "Consider adding more specific examples with measurable outcomes.",
        "Watch for filler words that may reduce perceived confidence.",
      ],
      improvements: [
        "Start each answer by briefly setting the context, then describe your specific actions.",
        "Practice quantifying your achievements (e.g., 'increased efficiency by 30%').",
        "Pause briefly before answering to gather your thoughts and appear more composed.",
      ],
      evaluation: {
        clarity: "Your ideas come through, but could be organized more clearly for maximum impact.",
        confidence: "Good energy overall. A slower pace would project even more authority.",
        readiness: "You're on the right track. A few more practice sessions will sharpen your delivery.",
      },
      sampleAnswer: "In my previous role, I noticed our team was spending excessive time on manual reporting. I took the initiative to research automation tools, presented a proposal to my manager, and led the implementation. This reduced reporting time by 40% and allowed the team to focus on strategic work.",
      encouragement: "You're making great progress! Every practice session builds your confidence. Keep going – your dedication will pay off in your next interview!",
    };

    setFeedback(mockFeedback);
    setState("feedback");
  };

  const handleRestart = () => {
    setState("hero");
    setInterviewData(null);
    setFeedback(null);
  };

  return (
    <main className="min-h-screen">
      {state === "hero" && (
        <Hero onStart={() => setState("setup")} />
      )}

      {state === "setup" && (
        <InterviewSetup 
          onComplete={handleSetupComplete}
          onBack={() => setState("hero")}
        />
      )}

      {state === "practice" && interviewData && (
        <InterviewPractice
          interviewType={interviewData.interviewType}
          field={interviewData.field}
          jobTitle={interviewData.jobTitle}
          onComplete={generateFeedback}
        />
      )}

      {state === "loading" && (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
              <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
            </div>
            <h2 className="text-2xl font-bold font-display text-foreground mb-2">
              Analyzing Your Responses
            </h2>
            <p className="text-muted-foreground">
              Your personalized feedback is being prepared...
            </p>
          </div>
        </div>
      )}

      {state === "feedback" && feedback && (
        <FeedbackDisplay 
          feedback={feedback}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
};

export default Index;
