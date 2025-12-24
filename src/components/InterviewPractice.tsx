import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, ArrowRight, Loader2, Volume2 } from "lucide-react";

interface InterviewPracticeProps {
  interviewType: string;
  field: string;
  jobTitle: string;
  onComplete: (answers: { question: string; answer: string }[]) => void;
}

const questionSets: Record<string, string[]> = {
  behavioral: [
    "Tell me about a time when you had to work with a difficult team member. How did you handle it?",
    "Describe a situation where you had to meet a tight deadline. What was your approach?",
    "Give me an example of when you showed leadership, even if you weren't in a formal leadership role.",
    "Tell me about a time you failed at something. What did you learn from it?",
    "Describe a situation where you had to adapt to a significant change at work.",
    "Give me an example of a time when you had to persuade someone to see things your way.",
    "Tell me about a time you received critical feedback. How did you respond?",
    "Describe a situation where you went above and beyond your job responsibilities.",
    "Tell me about a time when you had to make a difficult decision with limited information.",
    "Give me an example of how you've handled a conflict between team members.",
  ],
  technical: [
    "Walk me through your approach to solving a complex problem in your field.",
    "What's a recent technical challenge you faced, and how did you overcome it?",
    "How do you stay updated with the latest developments in your area of expertise?",
    "Describe your experience with the tools and technologies relevant to this role.",
    "How do you approach debugging a difficult issue in your work?",
    "Tell me about a project where you had to learn a new technology quickly.",
    "How do you ensure the quality of your work before delivering it?",
    "Explain a complex concept from your field in simple terms.",
    "What's your approach to documentation and knowledge sharing?",
    "How do you handle technical disagreements with colleagues?",
  ],
  situational: [
    "If you disagreed with your manager's decision, how would you handle it?",
    "Imagine you're given a project with unclear requirements. What would be your first steps?",
    "How would you prioritize multiple urgent tasks with the same deadline?",
    "If a colleague wasn't pulling their weight on a team project, what would you do?",
    "How would you handle a situation where you made a mistake that affected others?",
    "If you were asked to do something you believed was wrong, how would you respond?",
    "How would you approach a task you've never done before?",
    "If you had conflicting instructions from two supervisors, what would you do?",
    "How would you handle a client who was unhappy with your work?",
    "If you noticed a process that was inefficient, how would you address it?",
  ],
  case: [
    "A client's sales have dropped 20% this quarter. Walk me through how you'd analyze this problem.",
    "How would you approach launching a new product in a competitive market?",
    "If you had to reduce costs by 15% without layoffs, what strategies would you consider?",
    "A competitor just launched a similar product at a lower price. How would you respond?",
    "How would you increase customer retention for a subscription-based service?",
    "A key team member just resigned during a critical project. How do you handle this?",
    "How would you evaluate whether to enter a new market?",
    "A major client is threatening to leave. What steps would you take to retain them?",
    "How would you improve employee engagement and productivity?",
    "A new regulation will significantly impact your business operations. How do you adapt?",
  ],
};

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

export function InterviewPractice({ interviewType, field, jobTitle, onComplete }: InterviewPracticeProps) {
  const questions = questionSets[interviewType] || questionSets.behavioral;
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; answer: string }[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + ' ' + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    setTranscript("");
    setIsRecording(true);
    
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    // Small delay to ensure final transcript is captured
    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  const handleNext = () => {
    const newAnswer = {
      question: questions[currentQ],
      answer: transcript.trim() || "No answer recorded",
    };
    
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setTranscript("");

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      onComplete(updatedAnswers);
    }
  };

  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <p className="text-sm font-medium text-primary mb-2">
            {field} • {jobTitle}
          </p>
          <h1 className="text-2xl font-bold font-display text-foreground">
            {interviewType.charAt(0).toUpperCase() + interviewType.slice(1)} Interview
          </h1>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQ + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full gradient-accent transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8 mb-6 animate-scale-in">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Volume2 className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xl font-medium text-foreground leading-relaxed">
              {questions[currentQ]}
            </p>
          </div>

          {/* Recording area */}
          <div className="bg-muted/50 rounded-xl p-6 min-h-[150px] relative">
            {transcript ? (
              <p className="text-foreground leading-relaxed">{transcript}</p>
            ) : (
              <p className="text-muted-foreground italic">
                {isRecording ? "Listening... Speak your answer" : "Click the microphone to start recording your answer"}
              </p>
            )}

            {/* Recording indicator */}
            {isRecording && (
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                <span className="text-sm font-medium text-accent">Recording</span>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          {!isRecording ? (
            <Button
              variant="hero"
              size="xl"
              onClick={startRecording}
              disabled={isProcessing}
              className="gap-3"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
              {isProcessing ? "Processing..." : "Start Recording"}
            </Button>
          ) : (
            <Button
              variant="warm"
              size="xl"
              onClick={stopRecording}
              className="gap-3"
            >
              <Square className="w-5 h-5" />
              Stop Recording
            </Button>
          )}

          {transcript && !isRecording && (
            <Button
              variant="default"
              size="xl"
              onClick={handleNext}
              className="gap-2"
            >
              {currentQ < questions.length - 1 ? "Next Question" : "Get Feedback"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Speak clearly into your microphone. Take your time to structure your response.
        </p>
      </div>
    </div>
  );
}
