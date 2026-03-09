import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { Target } from "lucide-react";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PerformanceChart from "@/components/PerformanceChart";

import {
  LogOut,
  Video,
  TrendingUp,
  Award,
  Clock,
  BarChart3,
  BookOpen,
  Mail,
  History,
  HistoryIcon,
} from "lucide-react";

export default function Dashboard() {

const { user } = useAuth();
const navigate = useNavigate();

const admins = [
  "voice2career@yahoo.com"
];

const isAdmin = admins.includes(user?.email);
  //const navigate = useNavigate();
const [plan, setPlan] = useState("Free");
  const [username, setUsername] = useState("");
  const [interviews, setInterviews] = useState<any[]>([]);
  const [mockTests, setMockTests] = useState<any[]>([]);
  // GROUP MOCK TESTS BY testId
const groupedMockTests = mockTests.reduce(
  (acc: Record<string, any[]>, test: any) => {
    if (!acc[test.testId]) {
      acc[test.testId] = [];
    }
    acc[test.testId].push(test);
    return acc;
  },
  {}
);



  /* ================= LOAD DATA (FIRESTORE) ================= */

  const loadInterviews = async () => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "interviews"),
      orderBy("createdAt", "desc")
    );

    const snap = await getDocs(q);
    const data = snap.docs.map(d => d.data());

    setInterviews(data);
  };
  const loadMockTests = async () => {
  if (!user) return;

  const q = query(
    collection(db, "users", user.uid, "mockTests"),
    orderBy("createdAt", "asc")
  );

  const snap = await getDocs(q);
  const data = snap.docs.map(d => ({
    id: d.id,
    ...d.data(),
  }));

  setMockTests(data);
};


  useEffect(() => {
    if (!user) return;

    const loadUser = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
  const data = snap.data();

  setUsername(data.name);
  setPlan(data.plan || "Free");
}
    };

    loadUser();
    loadInterviews();
    loadMockTests();


    // 🔥 refresh when tab / window comes back
    const onFocus = () => loadInterviews();
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        loadInterviews();
      }
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [user]);

  /* ================= STATS ================= */

  const total = interviews.length;
  // 🔥 REAL STREAK CALCULATION
const interviewDates = interviews
  .map((i: any) =>
    i.createdAt?.seconds
      ? new Date(i.createdAt.seconds * 1000)
      : null
  )
  .filter(Boolean)
  .map((d: Date) => {
    d.setHours(0, 0, 0, 0);
    return d;
  });

// remove duplicate same-day interviews
const uniqueDates = [...new Set(interviewDates.map(d => d.getTime()))]
  .map(time => new Date(time))
  .sort((a, b) => b.getTime() - a.getTime());

let streak = 0;
const today = new Date();
today.setHours(0, 0, 0, 0);

for (let i = 0; i < uniqueDates.length; i++) {
  const diff =
    (today.getTime() - uniqueDates[i].getTime()) /
    (1000 * 60 * 60 * 24);

  if (diff === streak) {
    streak++;
  } else {
    break;
  }
}

  const avg =
    total === 0
      ? 0
      : Math.round(
          interviews.reduce(
            (acc: number, i: any) =>
              acc + (i.score?.overall || 0),
            0
          ) / total
        );

  const practiceTime = interviews.reduce(
    (acc: number, i: any) => acc + (i.durationMinutes || 0),
    0
  );
const chartData = [...interviews]
  .reverse() // 🔥 oldest → newest
  .map((i: any, index: number) => ({
    score: i.score?.overall ?? 0,
    label: `Interview ${index + 1}`,
  }));
const mockProgressData = mockTests.map((t, index) => ({
  label: `Test ${index + 1}`,
  score: t.accuracy,
}));


  /* ================= ACTIONS ================= */

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const bookSession = () => {
    const subject = encodeURIComponent(
      "One-to-One Interview Session Booking"
    );
    const body = encodeURIComponent(
      `Hello Voice2Career Team,

I want to book a One-to-One Interview Session.

Name: ${username}
Email: ${user?.email}

Thanks,
${username}`
    );

    window.location.href = `mailto:voice2career@yahoo.com?subject=${subject}&body=${body}`;
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              Welcome back, {username}
              <span
  className={`ml-2 text-xs px-2 py-1 rounded-full ${
    plan === "Pro"
      ? "bg-purple-100 text-purple-700"
      : "bg-gray-100 text-gray-600"
  }`}
>
  {plan}
</span>
            </h1>
            <p className="text-sm text-gray-500">
              Let’s ace your next interview together
            </p>
          </div>

          <div className="flex items-center gap-4">

  <div
    onClick={() => navigate("/profile")}
    className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-xl transition"
  >
    <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
      {username ? username[0].toUpperCase() : "U"}
    </div>
    <span className="text-sm font-medium">
      {username}
    </span>
  </div>

  <Button
  variant="ghost"
  onClick={logout}
  className="text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
>
  <LogOut className="w-4 h-4 mr-2" />
  Logout
</Button>

</div>
        </div>
      </div>

     <div className="max-w-7xl mx-auto pl-8 pr-8 py-10">
      {/* LEFT QUICK ACTION DOCK */}
<div className="hidden lg:flex fixed left-2 top-1/2 -translate-y-1/2 flex-col items-center z-50">

  {/* TITLE */}
  <p className="text-xs text-gray-500 mb-2 font-medium tracking-wide">
    Quick Actions
  </p>

  {/* DOCK */}
  <div className="flex flex-col items-center gap-4 bg-white/70 backdrop-blur-xl border shadow-lg rounded-2xl p-3">

  <DockAction
    icon={<Video size={20} />}
   label="Start Interview"
    onClick={() => navigate("/interview")}
  />

  <DockAction
    icon={<HistoryIcon size={20}  />}
    label="Interview History"
    onClick={() => navigate("/history")}
  />

  <DockAction
    icon={<MessageSquare size={20} />}
    label="AI Assistant"
    onClick={() => navigate("/assistant")}
  />

  <DockAction
    icon={<BookOpen size={20}  />}
   label="Study Material"
    onClick={() => navigate("/study-materials")}
  />

  <DockAction
    icon={<Target size={20}  />}
    label="Start Mock Tests"
    onClick={() => navigate("/mock-tests")}
  />

  {isAdmin && (
    <DockAction
      icon={<BarChart3  size={20} />}
      label="Admin Panel"
      onClick={() => navigate("/admin")}
    />
  )}
</div>
</div>
<div className="flex-1">

        {/* HERO */}
        <div className="rounded-2xl border bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 p-8 flex justify-between mb-10">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Ready for your next interview?
            </h2>
            <p className="text-gray-600 max-w-xl">
              Practice with mock interviews and get instant feedback
            </p>
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate("/interview")}
          >
            <Video className="w-4 h-4 mr-2" />
            Start Interview
          </Button>
        </div>

        {/* 🔥 ONE-TO-ONE PRACTICE (UNCHANGED) */}
        <div className="mb-14">
          <div className="rounded-2xl border bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 p-10 flex flex-col md:flex-row justify-between gap-8">
            <div className="flex gap-4">
              <div className="h-14 w-14 rounded-xl bg-orange-100 flex items-center justify-center">
                <Mail className="text-orange-600" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-semibold">
                    One-to-One Real Interview Practice
                  </h2>
                  <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                    50% OFF
                  </span>
                </div>

                <p className="text-gray-600 max-w-xl mb-4">
                  Get personalized interview practice with a real industry expert trainer
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-green-600">
                    ₹150
                  </span>
                  <span className="line-through text-gray-400">
                    ₹300
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                  <Benefit text="Personalized feedback from industry experts" />
                  <Benefit text="Flexible scheduling to suit your availability" />
                  <Benefit text="Real-world interview scenarios and questions" />
                  <Benefit text="45–60 minute comprehensive interview session" />
                  <Benefit text="Detailed performance analysis & improvement tips" />
                  <Benefit text="Post-interview written feedback report" />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
                onClick={bookSession}
              >
                <Mail className="w-5 h-5 mr-2" />
                Book Your Session Now →
              </Button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Stat title="Total Interviews" value={total} icon={<Video className="h-6 w-6 text-blue-600"  />} iconBg="bg-blue-100"/>
          <Stat title="Avg Performance" value={`${avg}/100`} icon={<TrendingUp className="h-6 w-6 text-green-600"  />}iconBg="bg-green-100">
            <Progress value={avg} className="[&>div]:bg-blue-600"/>
          </Stat>
          <Stat
  title="Current Interview Streak"
  value={`${streak} days`}
  icon={<Award className="h-6 w-6 text-purple-600" />}
  iconBg="bg-purple-100"
/>
          <Stat title="Practice Time" value={`${practiceTime} min`} icon={<Clock className="h-6 w-6 text-orange-600" />} iconBg="bg-orange-100"/>
        </div>

        {/* PERFORMANCE CHART */}
        {/* INTERVIEW PROGRESS */}
<div className="mt-16">
  <h2 className="text-xl font-semibold mb-4">
    Interview Progress
  </h2>

  {chartData.length > 0 ? (
    <PerformanceChart
      data={chartData}
      title="interviews"
    />
  ) : (
    <p className="text-sm text-gray-400 text-center">
      No interview data yet. Start your first interview 🚀
    </p>
  )}
</div>

        {/* MOCK TEST PROGRESS */}
<div className="mt-16">
  <h2 className="text-xl font-semibold mb-4">
    Mock Test Progress
  </h2>

  {mockProgressData.length > 0 ? (
    <PerformanceChart
      data={mockProgressData}
      title="mock tests"
    />
  ) : (
    <p className="text-sm text-gray-400 text-center">
      No mock test data yet. Attempt your first mock test 🚀
    </p>
  )}
</div>

{/* MOCK TEST HISTORY */}
<div className="mt-16">
  <h2 className="text-xl font-semibold mb-6">
    Mock Test History
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {mockTests.length === 0 ? (
      <Card className="border-dashed">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600">
  🎯
</div>
          <div>
            <p className="font-semibold">
              No Mock Tests Yet
            </p>
            <p className="text-sm text-gray-500">
              Attempt a mock test to see your progress here
            </p>
          </div>
        </CardContent>
      </Card>
    ) : (
      Object.entries(groupedMockTests)
.sort(([a], [b]) => {
  const order = ["easy-medium", "medium-hard", "hard"];
  return order.indexOf(a) - order.indexOf(b);
})
.map(
  ([testId, attempts]: [string, any[]]) => {
    const totalAttempts = attempts.length;

    const bestAccuracy = Math.max(
      ...attempts.map((a: any) => a.accuracy)
    );

    const lastAttempt = attempts[attempts.length - 1];

    return (
      <Card
        key={testId}
        className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
        onClick={() => navigate(`/marksheet/${testId}`)}
      >
        <CardContent className="p-6 flex justify-between items-center">
          <div className="flex gap-4">
            <div
  className={`h-12 w-12 flex items-center justify-center rounded-xl ${
    testId === "easy-medium"
      ? "bg-green-50 text-green-600"
      : testId === "medium-hard"
      ? "bg-yellow-50 text-yellow-600"
      : "bg-red-50 text-red-600"
  }`}
>
  🎯
</div>

            <div>
              <p className="font-semibold">
  {testId === "easy-medium"
    ? "Easy Test"
    : testId === "medium-hard"
    ? "Medium Test"
    : testId === "hard"
    ? "Hard Test"
    : testId}
</p>

              <p className="text-sm text-gray-500">
                Attempts: {totalAttempts}
              </p>

              <p className="text-sm text-gray-500">
                Best Accuracy: {bestAccuracy}%
              </p>

              <p className="text-xs text-gray-400">
                Last Attempt: {lastAttempt.accuracy}%
              </p>
            </div>
          </div>

          <span className="text-gray-400 text-xl">→</span>
        </CardContent>
      </Card>
    );
  }
)

    )}
  </div>
</div>



        {/* QUICK ACTIONS */}
<div className="mt-16">
  <h2 className="text-xl font-semibold mb-6">
    Quick Actions
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
  <Action
    icon={<Video />}
    title="New Interview"
    description="Start a fresh interview training session"
    color="blue"
    onClick={() => navigate("/interview")}
  />

  <Action
    icon={<HistoryIcon />}
    title="Interview History"
    description="Review past performances and feedback"
    color="indigo"
    onClick={() => navigate("/history")}
  />

<Action
  icon={<MessageSquare />}
  title="AI Study Assistant"
  description="Ask doubts instantly (Works Offline)"
  color="purple"
  onClick={() => navigate("/assistant")}
/>

  <Action
    icon={<BookOpen />}
    title="Study Materials"
    description="Practice with detailed content."
    color="green"
    onClick={() => navigate("/study-materials")}
  />
  <Action
  icon={<Target />}
  title="Mock Placement Tests"
  description="Take real placement-style mock tests with timer & score"
  color="red"
  onClick={() => navigate("/mock-tests")}
/>
{isAdmin && (
  <Action
    icon={<BarChart3 />}
    title="Admin Dashboard"
    description="Manage subscription requests"
    color="purple"
    onClick={() => navigate("/admin")}
  />
)}

</div>
</div>

      </div>
    </div>
     </div>
  );
}

/* ================= HELPERS ================= */




function Stat({ icon, title, value, iconBg = "bg-gray-100", children }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div
  className={`h-12 w-12 flex items-center justify-center rounded-xl mb-3 ${iconBg}`}
>
  {icon}
</div>

        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
        {children}
      </CardContent>
    </Card>
  );
}

function Action({
  icon,
  title,
  description,
  color = "blue",
  onClick,
}: any) {
  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-green-50 text-green-600",
      red: "bg-red-50 text-red-600",
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition"
      onClick={onClick}
    >
      <CardContent className="p-6 flex justify-between items-start">
        <div className="flex gap-4">
          <div
  className={`h-12 w-12 flex items-center justify-center rounded-xl ${colorMap[color]}`}>
            {icon}
          </div>

          <div>
            <p className="font-semibold text-lg">
              {title}
            </p>
            <p className="text-sm text-gray-500">
              {description}
            </p>
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
      <span className="mt-1 h-4 w-4 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
        ✓
      </span>
      <span>{text}</span>
    </div>
  );
}
function DockAction({ icon, label, onClick }: any) {

  const colorMap: any = {
    "Start Interview": "bg-blue-50 text-blue-600",
    "Interview History": "bg-indigo-50 text-indigo-600",
    "AI Assistant": "bg-gray-100 text-black-600",
    "Study Material": "bg-green-50 text-green-600",
    "Start Mock Tests": "bg-red-50 text-red-600",
    "Admin Panel": "bg-yellow-50 text-yellow-600",
  };

  return (
    <div className="group relative flex flex-col items-center">

      <span className="absolute left-16 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
        {label}
      </span>

      <div
        onClick={onClick}
        className={`
        h-12 w-12
        flex items-center justify-center
        rounded-xl
        ${colorMap[label] || "bg-gray-100"}
        transition-all duration-300 ease-out
        transform
        group-hover:scale-150
        cursor-pointer
        `}
      >
        {icon}
      </div>

    </div>
  );
}