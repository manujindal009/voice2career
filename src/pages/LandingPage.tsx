import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Briefcase,
  MessageCircle,
  Check,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageCircle,
      title: "AI Interview Coach (comming soon)",
      description:
        "Practice with intelligent questions that mimic real interview scenarios",
    },
    {
      icon: TrendingUp,
      title: "Real-time Feedback",
      description:
        "Get analyzed feedback on speech, grammar, vocabulary, and confidence",
    },
    {
      icon: Briefcase,
      title: "Placement Assistance",
      description:
        "Access resources and guidance to land your dream job",
    },
  ];

  const benefits = [
    "1:1 guidance from industry experts",
    "Personalized interview preparation",
    "Real placement opportunities",
    "Confidence building through practice",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white font-bold text-lg">v2c</span>
            </div>
            <span className="font-bold text-xl text-white hidden sm:block">
              voice2career
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex-1 flex items-center justify-center px-6 pt-36 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm">
            <Sparkles className="h-4 w-4" />
             Interview & Placement Prepration Platform
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-blue-400">Master Interviews.</span>
            <br />
            <span className="text-white">Ace Your Career.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            voice2career combines mock interviews with placement
            assistance to help you land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 group"
              onClick={() => navigate("/signup")}
            >
              Start Preparing Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-gray-300 hover:bg-slate-800 hover:text-white"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </div>

          <div className="pt-12 border-t border-slate-800/50 grid sm:grid-cols-3 gap-8">
            <Stat value="100+" label="Users Placed Successfully" />
            <Stat value="95%" label="Interview Success Rate" />
            <Stat value="5" label="Partner Companies" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why voice2career?
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to succeed in interviews
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-xl border border-slate-800 bg-slate-900 hover:border-blue-500/30 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <Icon className="h-7 w-7 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {f.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Comprehensive Career Support
            </h2>

            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <Check className="h-5 w-5 text-blue-400 mt-1" />
                  <span className="text-gray-300">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-800 to-slate-900 p-8">
            <div className="aspect-video rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Users className="h-16 w-16 text-blue-400/40" />
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Join thousands preparing for their next big career move
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Ready to Transform Your Career?
          </h2>
          <p className="text-gray-400 text-lg">
            Start your free preparation today. No credit card required.
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 group"
            onClick={() => navigate("/signup")}
          >
            Begin Your Journey
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 voice2career. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300">Privacy</a>
            <a href="#" className="hover:text-gray-300">Terms</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="space-y-2">
      <p className="text-3xl font-bold text-blue-400">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}
