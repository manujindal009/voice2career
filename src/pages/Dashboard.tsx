import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { Target } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  doc, getDoc, collection, getDocs, orderBy, query,
} from "firebase/firestore";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PerformanceChart from "@/components/PerformanceChart";
import {
  LogOut, Video, TrendingUp, Award, Clock,
  BarChart3, BookOpen, Mail, HistoryIcon, Menu, X,
  ArrowUpRight, ArrowDownRight, Minus,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const scrollKey = "dashboard_scroll_position";

  const admins = ["voice2career@yahoo.com"];
  const isAdmin = admins.includes(user?.email);

  const [plan, setPlan]             = useState("Free");
  const [username, setUsername]     = useState("");
  const [interviews, setInterviews] = useState<any[]>([]);
  const [mockTests, setMockTests]   = useState<any[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // ── fast cache paint ────────────────────────────────────────────
  useEffect(() => {
    const cached = localStorage.getItem("userData");
    if (cached) {
      const data = JSON.parse(cached);
      setUsername(data.name || "");
      setPlan(data.plan || "Free");
    }
  }, []);

  // ── save scroll on every scroll event ──────────────────────────
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(scrollKey, window.scrollY.toString());
    };
    window.addEventListener("scroll", saveScroll);
    return () => window.removeEventListener("scroll", saveScroll);
  }, []);

  // ── restore scroll: poll until page height stabilises ──────────
  useEffect(() => {
    if (!dataLoaded) return;
    const saved = sessionStorage.getItem(scrollKey);
    if (!saved || parseInt(saved) === 0) return;

    const target = parseInt(saved);
    let lastHeight = 0;
    let stableCount = 0;
    let attempts = 0;
    const MAX_ATTEMPTS = 40;

    const poll = setInterval(() => {
      const currentHeight = document.body.scrollHeight;
      attempts++;

      if (currentHeight === lastHeight) {
        stableCount++;
      } else {
        stableCount = 0;
        lastHeight = currentHeight;
      }

      if (stableCount >= 3 || currentHeight >= target + window.innerHeight || attempts >= MAX_ATTEMPTS) {
        clearInterval(poll);
        window.scrollTo({ top: target, behavior: "auto" });
      }
    }, 50);

    return () => clearInterval(poll);
  }, [dataLoaded]);

  // ── firestore loaders ──────────────────────────────────────────
  const loadInterviews = async () => {
    if (!user) return;
    const q = query(
      collection(db, "users", user.uid, "interviews"),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    setInterviews(snap.docs.map(d => d.data()));
  };

  const loadMockTests = async () => {
    if (!user) return;
    const q = query(
      collection(db, "users", user.uid, "mockTests"),
      orderBy("createdAt", "asc")
    );
    const snap = await getDocs(q);
    setMockTests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  // ── main data fetch ────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;

    const loadAll = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setUsername(data.name || "");
        setPlan(data.plan || "Free");
        localStorage.setItem(
          "userData",
          JSON.stringify({ name: data.name, plan: data.plan })
        );
      }
      await Promise.all([loadInterviews(), loadMockTests()]);
      setDataLoaded(true);
    };

    loadAll();
  }, [user]);

  // ── grouped mock tests ─────────────────────────────────────────
  const groupedMockTests = mockTests.reduce(
    (acc: Record<string, any[]>, test: any) => {
      if (!acc[test.testId]) acc[test.testId] = [];
      acc[test.testId].push(test);
      return acc;
    }, {}
  );

  // ── stats ──────────────────────────────────────────────────────
  const total = interviews.length;

  const interviewDates = interviews
    .map((i: any) => i.createdAt?.seconds ? new Date(i.createdAt.seconds * 1000) : null)
    .filter(Boolean)
    .map((d: Date) => { d.setHours(0, 0, 0, 0); return d; });

  const uniqueDates = [...new Set(interviewDates.map(d => d.getTime()))]
    .map(t => new Date(t))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 0;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  for (let i = 0; i < uniqueDates.length; i++) {
    const diff = (today.getTime() - uniqueDates[i].getTime()) / (1000 * 60 * 60 * 24);
    if (diff === streak) streak++; else break;
  }

  const avg = total === 0 ? 0
    : Math.round(interviews.reduce((acc: number, i: any) => acc + (i.score?.overall || 0), 0) / total);

  const practiceTime = interviews.reduce((acc: number, i: any) => acc + (i.durationMinutes || 0), 0);

  // ── chart data: full for stats, last 10 for display ────────────
  const allChartData = [...interviews].reverse().map((i: any, index: number) => ({
  score: i.score?.overall ?? 0,
  label: `Interview ${index + 1}`,
}));
  const chartData = allChartData.slice(-10);

 const allMockProgressData = mockTests.map((t, index) => ({
  label: `Test ${index + 1}`,
  score: t.accuracy,
}));
  const mockProgressData = allMockProgressData.slice(-10);

  // ── chart stat helpers (all-time) ─────────────────────────────
  const getChartStats = (data: { score: number }[]) => {
    if (!data.length) return null;
    const scores = data.map(d => d.score);
    const best   = Math.max(...scores);
    const latest = scores[scores.length - 1];
    const prev   = scores.length > 1 ? scores[scores.length - 2] : latest;
    const trend  = latest > prev ? "up" : latest < prev ? "down" : "flat";
    const avgVal = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return { best, latest, trend, avg: avgVal };
  };

  const interviewStats = getChartStats(allChartData);
  const mockStats      = getChartStats(allMockProgressData);

  // ── actions ────────────────────────────────────────────────────
  const logout = async () => { await signOut(auth); navigate("/login"); };

  const bookSession = () => {
    const subject = encodeURIComponent("One-to-One Interview Session Booking");
    const body = encodeURIComponent(
      `Hello Voice2Career Team,\n\nI want to book a One-to-One Interview Session.\n\nName: ${username}\nEmail: ${user?.email}\n\nThanks,\n${username}`
    );
    window.location.href = `mailto:voice2career@yahoo.com?subject=${subject}&body=${body}`;
  };

  const navTo = (path: string) => {
    sessionStorage.setItem(scrollKey, String(window.scrollY));
    navigate(path);
  };

  const navItems = [
    { icon: <Video size={20} />,         label: "Start Interview",    path: "/interview",       color: "blue"   },
    { icon: <HistoryIcon size={20} />,   label: "Interview History",  path: "/history",         color: "indigo" },
    { icon: <Target size={20} />,        label: "Mock Tests",         path: "/mock-tests",      color: "red"    },
    { icon: <HistoryIcon size={20} />,   label: "Mock Test History",  path: "/mock-history",    color: "purple" },
    { icon: <MessageSquare size={20} />, label: "AI Assistant",       path: "/assistant",       color: "gray"   },
    { icon: <BookOpen size={20} />,      label: "Study Material",     path: "/study-materials", color: "green"  },
    ...(isAdmin
      ? [{ icon: <BarChart3 size={20} />, label: "Admin Panel", path: "/admin", color: "yellow" }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── HEADER ── */}
      <div className="border-b sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold flex items-center gap-2 flex-wrap">
              Welcome back, {username}
              <span className={`text-xs px-2 py-1 rounded-full ${
                plan === "Pro" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"
              }`}>{plan}</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">Let's ace your next interview together</p>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div onClick={() => navTo("/profile")}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-xl transition">
              <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                {username ? username[0].toUpperCase() : "U"}
              </div>
              <span className="text-sm font-medium">{username}</span>
            </div>
            <Button variant="ghost" onClick={logout}
              className="text-gray-700 hover:bg-red-50 hover:text-red-600 transition">
              <LogOut className="w-4 h-4 mr-2" />Logout
            </Button>
          </div>

          <div className="flex sm:hidden items-center gap-2">
            <div onClick={() => navTo("/profile")}
              className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm cursor-pointer">
              {username ? username[0].toUpperCase() : "U"}
            </div>
            <button onClick={() => setMobileMenu(v => !v)}
              className="p-2 rounded-xl hover:bg-gray-100 transition">
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="sm:hidden border-t bg-white px-4 py-3 flex flex-col gap-2">
            {navItems.map(item => (
              <button key={item.path}
                onClick={() => { setMobileMenu(false); navTo(item.path); }}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 text-sm font-medium text-left transition">
                <span className={`h-8 w-8 flex items-center justify-center rounded-lg
                  ${item.color === "blue"   ? "bg-blue-50 text-blue-600"     :
                    item.color === "indigo" ? "bg-indigo-50 text-indigo-600" :
                    item.color === "green"  ? "bg-green-50 text-green-600"   :
                    item.color === "red"    ? "bg-red-50 text-red-600"       :
                    item.color === "yellow" ? "bg-yellow-50 text-yellow-600" :
                    item.color === "purple" ? "bg-purple-50 text-purple-600" :
                    "bg-gray-100 text-gray-600"}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
            <button onClick={logout}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 text-sm font-medium text-left transition mt-1 border-t pt-3">
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10">

        {/* ── DESKTOP LEFT DOCK ── */}
        <div className="hidden lg:flex fixed left-2 top-1/2 -translate-y-1/2 flex-col items-center z-50">
          <p className="text-xs text-gray-500 mb-2 font-medium tracking-wide">Quick Actions</p>
          <div className="flex flex-col items-center gap-4 bg-white/70 backdrop-blur-xl border shadow-lg rounded-2xl p-3">
            {navItems.map(item => (
              <DockAction key={item.path} icon={item.icon} label={item.label}
                onClick={() => navTo(item.path)} />
            ))}
          </div>
        </div>

        <div className="flex-1">

          {/* HERO */}
          <div className="rounded-2xl border bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2">Ready for your next interview?</h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-xl">
                Practice with mock interviews and get instant feedback
              </p>
            </div>
            <div className="flex sm:items-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                onClick={() => navTo("/interview")}>
                <Video className="w-4 h-4 mr-2" />Start Interview
              </Button>
            </div>
          </div>

          {/* ONE-TO-ONE */}
          <div className="mb-10 sm:mb-14">
            <div className="rounded-2xl border bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 p-6 sm:p-10 flex flex-col md:flex-row justify-between gap-6 sm:gap-8">
              <div className="flex gap-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Mail className="text-orange-600" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                    <h2 className="text-base sm:text-xl font-semibold">One-to-One Real Interview Practice</h2>
                    <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">50% OFF</span>
                  </div>
                  <p className="text-gray-600 text-sm max-w-xl mb-3 sm:mb-4">
                    Get personalized interview practice with a real industry expert trainer
                  </p>
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-green-600">₹150</span>
                    <span className="line-through text-gray-400">₹300</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm text-gray-700">
                    <Benefit text="Personalized feedback from industry experts" />
                    <Benefit text="Flexible scheduling to suit your availability" />
                    <Benefit text="Real-world interview scenarios and questions" />
                    <Benefit text="45–60 minute comprehensive interview session" />
                    <Benefit text="Detailed performance analysis & improvement tips" />
                    <Benefit text="Post-interview written feedback report" />
                  </div>
                </div>
              </div>
              <div className="flex md:items-center">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full md:w-auto"
                  onClick={bookSession}>
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />Book Your Session Now →
                </Button>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-12">
            <Stat title="Total Interviews" value={total}
              icon={<Video className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />} iconBg="bg-blue-100" />
            <Stat title="Avg Performance" value={`${avg}/100`}
              icon={<TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />} iconBg="bg-green-100">
              <Progress value={avg} className="[&>div]:bg-blue-600 mt-1" />
            </Stat>
            <Stat title="Interview Streak" value={`${streak} days`}
              icon={<Award className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />} iconBg="bg-purple-100" />
            <Stat title="Practice Time" value={`${practiceTime} min`}
              icon={<Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />} iconBg="bg-orange-100" />
          </div>

          {/* ── INTERVIEW PROGRESS CHART ── */}
          <div className="mt-10 sm:mt-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full bg-blue-500" />
              <h2 className="text-lg sm:text-xl font-semibold">Interview Progress</h2>
              {allChartData.length > 10 && (
                <span className="ml-auto text-xs text-gray-400">
                  Showing last 10 of {allChartData.length}
                </span>
              )}
            </div>

            {chartData.length > 0 ? (
              <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
                {interviewStats && (
                  <div className="flex flex-wrap gap-2 sm:gap-4 px-5 sm:px-6 pt-4 pb-2">
                    <ChartChip label="Best"    value={`${interviewStats.best}%`}  color="green"  />
                    <ChartChip label="Latest"  value={`${interviewStats.latest}%`} color="blue"  />
                    <ChartChip label="Average" value={`${interviewStats.avg}%`}   color="purple" />
                    <TrendChip trend={interviewStats.trend as "up" | "down" | "flat"} />
                  </div>
                )}
                <PerformanceChart data={chartData} title="interviews" />
              </div>
            ) : (
              <div className="rounded-2xl border bg-white p-12 text-center">
                <Video className="mx-auto mb-3 text-blue-200" size={36} />
                <p className="text-sm text-gray-400">No interview data yet. Start your first interview 🚀</p>
              </div>
            )}
          </div>

          {/* ── MOCK TEST PROGRESS CHART ── */}
          <div className="mt-10 sm:mt-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full bg-red-500" />
              <h2 className="text-lg sm:text-xl font-semibold">Mock Test Progress</h2>
              {allMockProgressData.length > 10 && (
                <span className="ml-auto text-xs text-gray-400">
                  Showing last 10 of {allMockProgressData.length}
                </span>
              )}
            </div>

            {mockProgressData.length > 0 ? (
              <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
                {mockStats && (
                  <div className="flex flex-wrap gap-2 sm:gap-4 px-5 sm:px-6 pt-4 pb-2">
                    <ChartChip label="Best"    value={`${mockStats.best}%`}   color="green"  />
                    <ChartChip label="Latest"  value={`${mockStats.latest}%`} color="red"    />
                    <ChartChip label="Average" value={`${mockStats.avg}%`}    color="purple" />
                    <TrendChip trend={mockStats.trend as "up" | "down" | "flat"} />
                  </div>
                )}
                <PerformanceChart data={mockProgressData} title="mock tests" />
              </div>
            ) : (
              <div className="rounded-2xl border bg-white p-12 text-center">
                <Target className="mx-auto mb-3 text-red-200" size={36} />
                <p className="text-sm text-gray-400">No mock test data yet. Attempt your first mock test 🚀</p>
              </div>
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div className="mt-10 sm:mt-14 pb-24 sm:pb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Action icon={<Video />}         title="New Interview"        description="Start a fresh interview training session"        color="blue"   onClick={() => navTo("/interview")} />
              <Action icon={<HistoryIcon />}   title="Interview History"    description="Review past performances and feedback"           color="indigo" onClick={() => navTo("/history")} />
              <Action icon={<Target />}        title="Mock Placement Tests" description="Take real placement-style mock tests with timer" color="red"    onClick={() => navTo("/mock-tests")} />
              <Action icon={<HistoryIcon />}   title="Mock Test History"    description="View Easy, Medium and Hard test attempts"        color="purple" onClick={() => navTo("/mock-history")} />
              <Action icon={<MessageSquare />} title="AI Study Assistant"   description="Ask doubts instantly (Works Offline)"            color="gray"   onClick={() => navTo("/assistant")} />
              <Action icon={<BookOpen />}      title="Study Materials"      description="Practice with detailed content."                 color="green"  onClick={() => navTo("/study-materials")} />
              {isAdmin && (
                <Action icon={<BarChart3 />}  title="Admin Dashboard"      description="Manage subscription requests"                   color="purple" onClick={() => navTo("/admin")} />
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex sm:hidden z-40">
        {navItems.slice(0, 5).map(item => (
          <button key={item.path}
            onClick={() => navTo(item.path)}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 hover:bg-gray-50 transition active:bg-gray-100">
            <span className={`
              ${item.color === "blue"   ? "text-blue-600"   :
                item.color === "indigo" ? "text-indigo-600" :
                item.color === "green"  ? "text-green-600"  :
                item.color === "red"    ? "text-red-600"    :
                item.color === "purple" ? "text-purple-600" :
                "text-gray-600"}
            `}>{item.icon}</span>
            <span className="text-[9px] text-gray-500 leading-tight text-center px-1">
              {item.label.replace("Start ", "").replace("Interview ", "").replace("Study ", "")}
            </span>
          </button>
        ))}
      </div>

    </div>
  );
}

/* ── CHART CHIPS ── */

function ChartChip({ label, value, color }: { label: string; value: string; color: string }) {
  const colors: any = {
    green:  "bg-green-50 text-green-700 border-green-200",
    blue:   "bg-blue-50 text-blue-700 border-blue-200",
    red:    "bg-red-50 text-red-700 border-red-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  };
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${colors[color] ?? colors.blue}`}>
      <span className="text-gray-400">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function TrendChip({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up") return (
    <div className="flex items-center gap-1 px-3 py-1 rounded-full border bg-green-50 text-green-700 border-green-200 text-xs font-medium">
      <ArrowUpRight size={12} /> Improving
    </div>
  );
  if (trend === "down") return (
    <div className="flex items-center gap-1 px-3 py-1 rounded-full border bg-red-50 text-red-600 border-red-200 text-xs font-medium">
      <ArrowDownRight size={12} /> Dropped
    </div>
  );
  return (
    <div className="flex items-center gap-1 px-3 py-1 rounded-full border bg-gray-50 text-gray-500 border-gray-200 text-xs font-medium">
      <Minus size={12} /> Steady
    </div>
  );
}

/* ── OTHER HELPERS ── */

function Stat({ icon, title, value, iconBg = "bg-gray-100", children }: any) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className={`h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl mb-3 ${iconBg}`}>
          {icon}
        </div>
        <p className="text-xs sm:text-sm text-gray-500">{title}</p>
        <p className="text-xl sm:text-2xl font-semibold">{value}</p>
        {children}
      </CardContent>
    </Card>
  );
}

function Action({ icon, title, description, color = "blue", onClick }: any) {
  const colorMap: any = {
    blue:   "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    green:  "bg-green-50 text-green-600",
    red:    "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
    gray:   "bg-gray-100 text-gray-600",
  };
  return (
    <Card className="cursor-pointer hover:shadow-md transition" onClick={onClick}>
      <CardContent className="p-5 sm:p-6 flex justify-between items-start">
        <div className="flex gap-3 sm:gap-4">
          <div className={`h-10 w-10 sm:h-12 sm:w-12 shrink-0 flex items-center justify-center rounded-xl ${colorMap[color] ?? colorMap.blue}`}>
            {icon}
          </div>
          <div>
            <p className="font-semibold text-base sm:text-lg">{title}</p>
            <p className="text-xs sm:text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <span className="text-gray-400 text-xl">→</span>
      </CardContent>
    </Card>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-1 h-4 w-4 shrink-0 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">✓</span>
      <span className="text-xs sm:text-sm">{text}</span>
    </div>
  );
}

function DockAction({ icon, label, onClick }: any) {
  const colorMap: any = {
    "Start Interview":   "bg-blue-50 text-blue-600",
    "Interview History": "bg-indigo-50 text-indigo-600",
    "AI Assistant":      "bg-gray-100 text-gray-600",
    "Study Material":    "bg-green-50 text-green-600",
    "Mock Tests":        "bg-red-50 text-red-600",
    "Mock Test History": "bg-purple-50 text-purple-600",
    "Admin Panel":       "bg-yellow-50 text-yellow-600",
  };
  return (
    <div className="group relative flex flex-col items-center">
      <span className="absolute left-16 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-10">
        {label}
      </span>
      <div onClick={onClick}
        className={`h-12 w-12 flex items-center justify-center rounded-xl
          ${colorMap[label] || "bg-gray-100"}
          transition-all duration-300 ease-out transform group-hover:scale-150 cursor-pointer`}>
        {icon}
      </div>
    </div>
  );
}