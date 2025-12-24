import { Button } from "@/components/ui/button";
import { Mic, Sparkles, ArrowRight } from "lucide-react";

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="gradient-hero min-h-screen relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
        {/* Badge */}
        <div className="animate-fade-in mb-8" style={{ animationDelay: '0.1s' }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-foreground/80 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Voice2Career — AI Interview Coach
          </span>
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-in font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground max-w-4xl leading-tight" style={{ animationDelay: '0.2s' }}>
          Master Your{" "}
          <span className="text-gradient">English Interview</span>{" "}
          Skills
        </h1>

        {/* Subheading */}
        <p className="animate-fade-in mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-2xl leading-relaxed" style={{ animationDelay: '0.3s' }}>
          Practice real interview scenarios with voice, get instant AI feedback, 
          and build the confidence to ace your next opportunity.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in flex flex-col sm:flex-row gap-4 mt-10" style={{ animationDelay: '0.4s' }}>
          <Button variant="hero" size="xl" onClick={onStart} className="group">
            <Mic className="w-5 h-5" />
            Start Practice
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="glass" size="xl">
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="animate-fade-in grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/10" style={{ animationDelay: '0.5s' }}>
          {[
            { value: "10K+", label: "Practice Sessions" },
            { value: "95%", label: "Success Rate" },
            { value: "50+", label: "Industries" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground font-display">{stat.value}</p>
              <p className="text-sm text-primary-foreground/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120V60C240 20 480 0 720 0C960 0 1200 20 1440 60V120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
}
