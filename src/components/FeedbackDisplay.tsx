import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Lightbulb, MessageSquare, Trophy, RotateCcw } from "lucide-react";

interface FeedbackDisplayProps {
  feedback: {
    mistakes: string[];
    improvements: string[];
    evaluation: {
      clarity: string;
      confidence: string;
      readiness: string;
    };
    sampleAnswer: string;
    encouragement: string;
  };
  onRestart: () => void;
}

export function FeedbackDisplay({ feedback, onRestart }: FeedbackDisplayProps) {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
            Your Interview Feedback
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's your personalized coaching report
          </p>
        </div>

        {/* Mistakes */}
        <section className="bg-card rounded-2xl shadow-lg border border-border p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="text-xl font-bold font-display text-foreground">Top 3 Areas to Improve</h2>
          </div>
          <ul className="space-y-3">
            {feedback.mistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                <span className="w-6 h-6 rounded-full bg-destructive/20 text-destructive flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-foreground">{mistake}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Improvements */}
        <section className="bg-card rounded-2xl shadow-lg border border-border p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold font-display text-foreground">Actionable Improvements</h2>
          </div>
          <ul className="space-y-3">
            {feedback.improvements.map((improvement, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{improvement}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Evaluation */}
        <section className="bg-card rounded-2xl shadow-lg border border-border p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold font-display text-foreground">Quick Evaluation</h2>
          </div>
          <div className="grid gap-4">
            {[
              { label: "Communication Clarity", value: feedback.evaluation.clarity },
              { label: "Speaking Confidence", value: feedback.evaluation.confidence },
              { label: "Interview Readiness", value: feedback.evaluation.readiness },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-sm font-medium text-muted-foreground mb-1">{item.label}</p>
                <p className="text-foreground font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Answer */}
        <section className="bg-card rounded-2xl shadow-lg border border-border p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-xl font-bold font-display text-foreground">Improved Sample Answer</h2>
          </div>
          <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
            <p className="text-foreground leading-relaxed italic">"{feedback.sampleAnswer}"</p>
          </div>
        </section>

        {/* Encouragement */}
        <section className="gradient-hero rounded-2xl p-8 text-center mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-xl text-primary-foreground font-medium leading-relaxed">
            {feedback.encouragement}
          </p>
        </section>

        {/* CTA */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button variant="hero" size="xl" onClick={onRestart} className="gap-3">
            <RotateCcw className="w-5 h-5" />
            Practice Again
          </Button>
        </div>
      </div>
    </div>
  );
}
