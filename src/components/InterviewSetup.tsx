import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Briefcase, Building2, User } from "lucide-react";

interface InterviewSetupProps {
  onComplete: (data: { interviewType: string; field: string; jobTitle: string }) => void;
  onBack: () => void;
}

const interviewTypes = [
  { id: "behavioral", label: "Behavioral", description: "Focus on past experiences" },
  { id: "technical", label: "Technical", description: "Skills & knowledge assessment" },
  { id: "situational", label: "Situational", description: "Hypothetical scenarios" },
  { id: "case", label: "Case Study", description: "Problem-solving exercises" },
];

const fields = [
  "Technology", "Finance", "Healthcare", "Marketing", 
  "Education", "Consulting", "Engineering", "Sales",
  "Human Resources", "Operations", "Legal", "Other"
];

export function InterviewSetup({ onComplete, onBack }: InterviewSetupProps) {
  const [step, setStep] = useState(1);
  const [interviewType, setInterviewType] = useState("");
  const [field, setField] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({ interviewType, field, jobTitle });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const canProceed = 
    (step === 1 && interviewType) || 
    (step === 2 && field) || 
    (step === 3 && jobTitle.trim());

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Step {step} of 3</span>
            <span className="text-sm font-medium text-primary">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full gradient-accent transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8 animate-fade-in">
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display text-foreground">Interview Type</h2>
                  <p className="text-muted-foreground">What kind of interview are you preparing for?</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {interviewTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setInterviewType(type.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      interviewType === type.id
                        ? "border-primary bg-primary/5 shadow-glow"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <p className="font-semibold text-foreground font-display">{type.label}</p>
                    <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display text-foreground">Industry Field</h2>
                  <p className="text-muted-foreground">Select your target industry</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {fields.map((f) => (
                  <button
                    key={f}
                    onClick={() => setField(f)}
                    className={`p-3 rounded-xl border-2 text-center transition-all duration-200 font-medium ${
                      field === f
                        ? "border-primary bg-primary/5 text-primary shadow-glow"
                        : "border-border text-foreground hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display text-foreground">Job Title</h2>
                  <p className="text-muted-foreground">What position are you applying for?</p>
                </div>
              </div>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Senior Software Engineer"
                className="w-full h-14 px-4 rounded-xl border-2 border-border bg-background text-foreground text-lg font-medium placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <p className="text-sm text-muted-foreground mt-3">
                Be specific – this helps tailor the interview questions to your role.
              </p>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6">
          <Button variant="ghost" onClick={handlePrev} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button 
            variant="hero" 
            onClick={handleNext} 
            disabled={!canProceed}
            className="gap-2"
          >
            {step === 3 ? "Start Interview" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
