import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut, deleteUser } from "firebase/auth";
import { 
  doc, 
  deleteDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  getDocs,
  addDoc
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const [editing, setEditing] = React.useState(false);
    const navigate = useNavigate();
  const { user } = useAuth();

  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [headline, setHeadline] = React.useState("");
const [bio, setBio] = React.useState("");
const [linkedin, setLinkedin] = React.useState("");
const [github, setGithub] = React.useState("");
const [mockTests, setMockTests] = React.useState(0);
const [interviews, setInterviews] = React.useState(0);
const [avgAccuracy, setAvgAccuracy] = React.useState(0);
const [bestAccuracy, setBestAccuracy] = React.useState(0);
const [weakest, setWeakest] = React.useState("N/A");
const [plan, setPlan] = React.useState("Beginner");
const [accuracyHistory, setAccuracyHistory] = React.useState([]);
const [streak, setStreak] = React.useState(0);
const [badges, setBadges] = React.useState<string[]>([]);
const [xp, setXp] = React.useState(0);
const [level, setLevel] = React.useState(1);
const [trend, setTrend] = React.useState("Stable");

  React.useEffect(() => {
  const loadUserData = async () => {
    if (!user) return;

const userRef = doc(db, "users", user.uid);
const userSnap = await getDoc(userRef);

const today = new Date();
today.setHours(0, 0, 0, 0);

if (userSnap.exists()) {
  const data = userSnap.data();

  let lastLogin = data.lastLoginDate
    ? new Date(data.lastLoginDate.seconds * 1000)
    : null;

  let currentStreak = data.loginStreak || 0;

  if (lastLogin) {
    lastLogin.setHours(0, 0, 0, 0);

    const diff =
      (today.getTime() - lastLogin.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      currentStreak += 1;
    } else if (diff > 1) {
      currentStreak = 1;
    }
  } else {
    currentStreak = 1;
  }

  await updateDoc(userRef, {
    lastLoginDate: today,
    loginStreak: currentStreak,
  });

  setStreak(currentStreak);
}
    
const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
      const data = snap.data();

setName(data.name || "");
setLocation(data.location || "");
setHeadline(data.headline || "");
setPlan(data.plan || "Beginner");

setBio(data.bio || "");
setLinkedin(data.linkedin || "");
setGithub(data.github || "");
// 🔥 MOCK TESTS LOAD
const mockSnap = await getDocs(
  collection(db, "users", user.uid, "mockTests")
);

setMockTests(mockSnap.size);

// 🔥 XP SYSTEM
const totalXP = mockSnap.size * 50;
setXp(totalXP);

const calculatedLevel = Math.floor(totalXP / 200) + 1;
setLevel(calculatedLevel);

let accArr = [];
let weakMap = {};
let dates = [];

mockSnap.forEach((doc) => {
  const data = doc.data();

  if (data.accuracy) {
    accArr.push(data.accuracy);
  }

  if (data.weakSection) {
    weakMap[data.weakSection] =
      (weakMap[data.weakSection] || 0) + 1;
  }
  if (data.createdAt) {
  dates.push(new Date(data.createdAt.seconds * 1000));
}
});


// Average + Best
if (accArr.length > 0) {
  const avg =
    accArr.reduce((a, b) => a + b, 0) /
    accArr.length;

  setAvgAccuracy(Math.round(avg));
  setBestAccuracy(Math.max(...accArr));
}
setAccuracyHistory(accArr);

// 🔥 PERFORMANCE TREND
if (accArr.length >= 6) {
  const last3 = accArr.slice(-3);
  const prev3 = accArr.slice(-6, -3);

  const lastAvg =
    last3.reduce((a, b) => a + b, 0) / 3;

  const prevAvg =
    prev3.reduce((a, b) => a + b, 0) / 3;

  if (lastAvg > prevAvg) {
    setTrend("Improving 📈");
  } else if (lastAvg < prevAvg) {
    setTrend("Declining 📉");
  } else {
    setTrend("Stable ➖");
  }
}

// Weakest
if (Object.keys(weakMap).length > 0) {
  const weakestSection = Object.keys(weakMap).reduce((a, b) =>
    weakMap[a] > weakMap[b] ? a : b
  );

  setWeakest(weakestSection);
}

// 🔥 INTERVIEWS LOAD
const interviewSnap = await getDocs(
  collection(db, "users", user.uid, "interviews")
);

setInterviews(interviewSnap.size);

    }
  };

  loadUserData();
}, [user]);

React.useEffect(() => {

  let newBadges: string[] = [];

  if (streak >= 7) {
    newBadges.push("🔥 Consistent");
  }

  if (streak >= 30) {
    newBadges.push("🏆 Elite");
  }

  if (mockTests >= 45) {
    newBadges.push("💪 Dedicated");
  }

  if (avgAccuracy >= 90) {
    newBadges.push("🎯 Sharp Mind");
  }

  setBadges(newBadges);

}, [streak, mockTests, avgAccuracy]);

const handleProUpgrade = async () => {
  if (!user) return;

  try {

    await addDoc(collection(db, "subscriptionRequests"), {
      name: name,
      email: user.email,
      userId: user.uid,
      plan: "Pro",
      status: "pending",
      createdAt: new Date()
    });

    alert("Subscription request sent to admin");

  } catch (err) {
    console.error("REQUEST ERROR:", err);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-6">
      <button
  onClick={() => navigate(-1)}
  className="fixed top-2 left-4 z-[9999] bg-transparent border border-gray-200 px-2 py-1 rounded-xl hover:bg-gray-100"
>
  ← Back
</button>

      <div className="max-w-[1200px] mx-auto space-y-14">

        {/* HEADER */}
       <div className="bg-white/70 backdrop-blur-md border border-gray-200 p-10 rounded-3xl shadow-lg flex justify-between items-start">
          <div className="flex gap-6">

            {/* Avatar */}
            <div className="h-28 w-28 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-white text-3xl font-bold shadow-lg">
            {name ? name.charAt(0).toUpperCase() : "U"}
            </div>

            <div>
             <div className="flex items-center gap-4">
  <h1 className="text-[32px] font-semibold tracking-tight text-gray-900">
    {name}
  </h1>

  <button
    onClick={() => setEditing(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm"
  >
    Edit
  </button>
</div>

              <p className="text-lg text-gray-600 mt-1">
                {headline}
              </p>

              <div className="flex gap-3 mt-3">
                <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1.5 rounded-full">
                  ✓ Verified
                </span>

                {plan === "Pro" && (
  <span className="bg-green-100 text-green-600 text-sm px-3 py-1.5 rounded-full">
    Pro
  </span>
)}
              </div>

              <div className="mt-4 text-sm text-gray-500 space-y-1">
                {/* <p>📍 {location}</p> */}
                <p>✉ {user?.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-100 px-8 py-6 rounded-xl text-center">
            <p className="text-blue-600 text-lg font-semibold">
              🔥 {streak}
            </p>
            <p className="text-blue-600 text-sm">
              Days Streak
            </p>
            <div className="mt-4">
  <p className="text-sm text-gray-600">
    Level {level}
  </p>

  <div className="w-40 h-2 bg-gray-200 rounded mt-1">
    <div
      className="h-2 bg-purple-600 rounded"
      style={{
        width: `${(xp % 200) / 2}%`,
      }}
    />
  </div>

  <p className="text-xs text-gray-500 mt-1">
    {xp} XP
  </p>
</div>
          </div>
        </div>

        {/* ABOUT + SOCIAL */}
        <div className="grid grid-cols-3 gap-6">

          <div className="col-span-2 bg-white p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <h2 className="text-lg font-semibold mb-4">
  About
</h2>

{bio ? (
  <p className="text-gray-600 leading-relaxed">
    {bio}
  </p>
) : (
  <div className="border border-dashed border-gray-300 rounded-xl py-8 text-center">
    <p className="text-gray-400 text-sm mb-3">
      You haven't added a bio yet.
    </p>

    <button
      onClick={() => setEditing(true)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
    >
      Add your bio
    </button>
  </div>
)}
          </div>

          <div className="bg-white/80 backdrop-blur border border-gray-200 p-8 rounded-3xl shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4">
              Social Links
            </h2>

            <div className="flex flex-col gap-3">
              <button
  disabled={!linkedin}
  onClick={() => window.open(linkedin, "_blank")}
  className={`px-4 py-2 rounded-lg border transition
    ${
      linkedin
        ? "bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100"
        : "bg-gray-100 text-gray-400 cursor-not-allowed"
    }`}
>
  {linkedin ? "LinkedIn" : "LinkedIn (Not Connected)"}
</button>

<button
  disabled={!github}
  onClick={() => window.open(github, "_blank")}
  className={`px-4 py-2 rounded-lg border transition
    ${
      github
        ? "bg-gray-100 hover:bg-gray-200"
        : "bg-gray-100 text-gray-400 cursor-not-allowed"
    }`}
>
  {github ? "GitHub" : "GitHub (Not Connected)"}
</button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
  <p className="text-gray-500 text-sm">Mock Tests</p>
  <p className="text-[28px] font-semibold mt-2">{mockTests}</p>
</div>

<div className="bg-white p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
  <p className="text-gray-500 text-sm">Interviews</p>
  <p className="text-[28px] font-semibold mt-2">{interviews}</p>
</div>

<div className="bg-white p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
  <p className="text-gray-500 text-sm">Average Accuracy</p>
  <p className="text-[28px] font-semibold mt-2">{avgAccuracy}%</p>
</div>

<div className="bg-white p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
  <p className="text-gray-500 text-sm">Best Accuracy</p>
  <p className="text-[28px] font-semibold mt-2">{bestAccuracy}%</p>
</div>
        </div>

        {/* ACCURACY */}
<div className="bg-white p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
 <div className="mb-6">

  <h2 className="text-lg font-semibold">
    Mock Test Accuracy Trend
  </h2>

  <p className="text-sm text-gray-500">
    Last {accuracyHistory.length} mock tests performance
  </p>

</div>

<div className="flex gap-8 mb-6 text-sm text-gray-600">

  <div>
    <p className="text-gray-400">Average</p>
    <p className="font-semibold">{avgAccuracy}%</p>
  </div>

  <div>
    <p className="text-gray-400">Best</p>
    <p className="font-semibold">{bestAccuracy}%</p>
  </div>

  <div>
    <p className="text-gray-400">Tests</p>
    <p className="font-semibold">{mockTests}</p>
  </div>

</div>

  {plan !== "Pro" ? (
    <div className="text-center text-gray-400 py-10">
      🔒 Upgrade to Pro to unlock detailed analytics
    </div>
  ) : (
    <div className="flex items-end justify-between h-[240px] w-full px-6 border-b border-gray-200 gap-4">
      {accuracyHistory.length === 0 ? (
  <div className="w-full flex flex-col items-center justify-center text-center py-12">
    
    <div className="text-4xl mb-3">📊</div>

    <p className="text-gray-500 text-sm">
      No accuracy data yet
    </p>

    <p className="text-gray-400 text-xs mt-1">
      Attempt mock tests to track your performance
    </p>

    <button
      onClick={() => navigate("/mock-tests")}
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
    >
      Attempt Mock Test
    </button>

  </div>
) : (
        accuracyHistory
          .slice(-10)
          .map((acc, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
  className={`${
    i === accuracyHistory.slice(-10).length - 1
      ? "bg-gradient-to-t from-purple-600 to-blue-400"
      : "bg-gradient-to-t from-blue-600 to-cyan-400"
  } w-full max-w-[40px] rounded-md transition-all duration-500 shadow-md hover:scale-110`}
                style={{
                  height: `${(acc / 100) * 200}px`,
transition: "height 0.6s ease"
                }}
              />
              <div className="text-center mt-2">
  <p className="text-xs text-gray-400">
    Test {i + 1}
  </p>

  <p className="text-xs font-medium">
    {acc}%
  </p>
</div>
            </div>
          ))
      )}
    </div>
  )}
</div>

        {/* WEAKEST */}
        {/* WEAKEST SECTION */}

<div className="bg-white p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

<h2 className="text-lg font-semibold mb-6">
Weakest Section
</h2>

<div className="flex items-center justify-between bg-red-50 border border-red-200 p-6 rounded-xl">

<div>

<p className="text-xs text-gray-500 mb-1">
Needs Improvement
</p>

<p className="text-xl font-semibold text-red-600">
{weakest}
</p>

<p className="text-sm text-gray-500 mt-1">
Based on your recent mock test performance
</p>

</div>

<div className="text-3xl">
⚠️
</div>

</div>

<div className="mt-5 bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-700">

💡 Tip: Practice more questions from <span className="font-semibold">{weakest}</span> to improve your overall accuracy.

</div>

</div>

{/* ACHIEVEMENTS */}

<div className="bg-white p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

<h2 className="text-lg font-semibold mb-6">
Achievements
</h2>

<div className="grid grid-cols-4 gap-6">

{/* BASIC USER */}
<div className={`relative p-5 border rounded-xl ${
  mockTests >= 1 ? "bg-yellow-50 border-yellow-200" : "bg-gray-50"
}`}>

{mockTests < 1 && (
  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
    <span className="text-4xl">🔒</span>
  </div>
)}

<div className={`${mockTests < 1 ? "opacity-30" : ""}`}>

<p className="text-xl mb-2">🎯</p>

<p className="text-sm font-semibold">
Getting Started
</p>

<p className="text-xs text-gray-500">
Complete your first mock test
</p>

<p className="text-xs mt-2 text-gray-400">
{mockTests >= 1 ? "Unlocked" : "Locked"}
</p>

</div>

</div>

{/* CONSISTENT */}
<div className={`relative p-5 border rounded-xl ${
  streak >= 7 ? "bg-yellow-50 border-yellow-200" : "bg-gray-50"
}`}>

{streak < 7 && (
  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
    <span className="text-4xl">🔒</span>
  </div>
)}

<div className={`${streak < 7 ? "opacity-30" : ""}`}>

<p className="text-xl mb-2">🔥</p>

<p className="text-sm font-semibold">
Consistent
</p>

<p className="text-xs text-gray-500">
Maintain 7 day streak
</p>

<p className="text-xs mt-2 text-gray-400">
{streak >= 7 ? "Unlocked" : `Progress: ${streak}/7`}
</p>

</div>

</div>
{/* DEDICATED */}
{/* DEDICATED */}
<div className={`relative p-5 border rounded-xl ${
  mockTests >= 45 ? "bg-yellow-50 border-yellow-200" : "bg-gray-50"
}`}>

{mockTests < 45 && (
  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
    <span className="text-4xl">🔒</span>
  </div>
)}

<div className={`${mockTests < 45 ? "opacity-30" : ""}`}>

<p className="text-xl mb-2">💪</p>

<p className="text-sm font-semibold">
Dedicated
</p>

<p className="text-xs text-gray-500">
Complete 45 mock tests
</p>

<p className="text-xs mt-2 text-gray-400">
{mockTests >= 45 ? "Unlocked" : `Progress: ${mockTests}/45`}
</p>

</div>

</div>

{/* SHARP MIND */}
{/* SHARP MIND */}
<div className={`relative p-5 border rounded-xl ${
  avgAccuracy >= 90 ? "bg-yellow-50 border-yellow-200" : "bg-gray-50"
}`}>

{avgAccuracy < 90 && (
  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
    <span className="text-4xl">🔒</span>
  </div>
)}

<div className={`${avgAccuracy < 90 ? "opacity-30" : ""}`}>

<p className="text-xl mb-2">🎯</p>

<p className="text-sm font-semibold">
Sharp Mind
</p>

<p className="text-xs text-gray-500">
Reach 90% average accuracy
</p>

<p className="text-xs mt-2 text-gray-400">
{avgAccuracy >= 90 ? "Unlocked" : `Current: ${avgAccuracy}%`}
</p>

</div>

</div>

</div>

</div>

{/* PERFORMANCE INSIGHTS */}

<div className="bg-white p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

  <h2 className="text-lg font-semibold mb-6">
    Performance Insights
  </h2>

  {plan !== "Pro" ? (

    <div className="text-center py-10">

      <p className="text-gray-400 text-sm mb-3">
        🔒 Unlock detailed performance insights with Pro
      </p>

      <button
        onClick={handleProUpgrade}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
      >
        Upgrade to Pro
      </button>

    </div>

  ) : (

    <div className="grid grid-cols-4 gap-6">

      {/* MOCK TESTS */}
      <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
        <p className="text-xs text-gray-500 mb-1">Mock Tests Completed</p>
        <p className="text-2xl font-semibold text-blue-600">
          {mockTests}
        </p>
      </div>

      {/* AVG ACCURACY */}
      <div className="bg-green-50 border border-green-100 p-5 rounded-xl">
        <p className="text-xs text-gray-500 mb-1">Average Accuracy</p>
        <p className="text-2xl font-semibold text-green-600">
          {avgAccuracy}%
        </p>
      </div>

      {/* WEAKEST */}
      <div className="bg-red-50 border border-red-100 p-5 rounded-xl">
        <p className="text-xs text-gray-500 mb-1">Weakest Section</p>
        <p className="text-lg font-semibold text-red-600">
          {weakest}
        </p>
      </div>

      {/* TREND */}
      <div className="bg-purple-50 border border-purple-100 p-5 rounded-xl">
        <p className="text-xs text-gray-500 mb-1">Performance Trend</p>
        <p className="text-lg font-semibold text-purple-600">
          {trend}
        </p>
      </div>

    </div>

  )}

</div>

      {/* SUBSCRIPTION PLANS */}
<div className="bg-white p-10 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
  <h2 className="text-2xl font-semibold mb-2">
    Subscription Plans
  </h2>
  <p className="text-gray-500 mb-8">
    Choose the plan that fits your preparation needs
  </p>

  <div className="grid grid-cols-3 gap-6">

    <div className="border rounded-2xl p-8">
      <h3 className="text-xl font-semibold mb-2">Beginner</h3>
      <p className="text-gray-500 text-sm mb-4">
        Perfect for getting started
      </p>
      <p className="text-3xl font-bold">
        ₹0 <span className="text-sm font-normal">/month</span>
      </p>
      <button className="mt-6 w-full bg-gray-200 py-2 rounded-lg">
        Current Plan
      </button>
    </div>

    <div className="relative border-2 border-blue-600 rounded-3xl p-8 shadow-lg bg-gradient-to-br from-blue-50 to-white">
      <span className="absolute -top-3 right-6 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
  Most Popular
</span>
      <h3 className="text-xl font-semibold mb-2">Pro</h3>
      <p className="text-gray-500 text-sm mb-4">
        Advanced features for serious prep
      </p>
      <p className="text-3xl font-bold">
        ₹149 <span className="text-sm font-normal">/month</span>
      </p>
     <button
  disabled={plan === "Pro"}
  onClick={handleProUpgrade}
  className={`mt-6 w-full py-2 rounded-lg transition ${
    plan === "Pro"
      ? "bg-blue-600 text-white cursor-not-allowed"
      : "bg-gray-200 hover:bg-gray-300"
  }`}
>
  {plan === "Pro" ? "Current Plan" : "Upgrade to Pro"}
</button>
    </div>

    <div className="border rounded-2xl p-8">
      <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
      <p className="text-gray-500 text-sm mb-4">
        For teams and organizations
      </p>
      <p className="text-3xl font-bold">Custom</p>
      <button className="mt-6 w-full bg-gray-200 py-2 rounded-lg">
        Contact Sales
      </button>
    </div>

  </div>
</div>

{/* ACTIONS */}
<div className="bg-white/80 backdrop-blur border border-gray-200 p-8 rounded-3xl shadow-md space-y-6">

  <h2 className="text-lg font-semibold">
    Account Actions
  </h2>

  {/* Back to Dashboard */}
  <button
    onClick={() => navigate("/app")}
    className="w-full bg-gray-100 hover:bg-gray-200 transition py-3 rounded-xl"
  >
    Back to Dashboard
  </button>

  {/* Logout */}
  <button
    onClick={async () => {
      await signOut(auth);
      navigate("/login");
    }}
    className="w-full bg-gray-100 hover:bg-gray-200 transition py-3 rounded-xl"
  >
    Logout
  </button>

  {/* Danger Zone */}
  <div className="pt-4 border-t border-gray-200">
    <p className="text-sm text-gray-500 mb-3">
      Danger Zone
    </p>

    <button
      onClick={async () => {
        const confirmDelete = confirm(
          "Are you sure? This cannot be undone."
        );
        if (!confirmDelete || !user) return;

        await deleteDoc(doc(db, "users", user.uid));
        await deleteUser(user);
        navigate("/login");
      }}
      className="w-full bg-red-50 hover:bg-red-100 transition text-red-600 py-3 rounded-xl border border-red-200"
    >
      Delete Account
    </button>
  </div>

</div>
{editing && (
   <div className="fixed inset-0 bg-black/30 flex items-center justify-center"> 
<div className="bg-white p-8 rounded-2xl w-[420px] shadow-xl space-y-4">
   <h3 className="text-xl font-semibold">Edit Profile</h3> 
   <input
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full border px-3 py-2 rounded-lg"
  placeholder="Name"
/> 
{/* <input
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  className="w-full border px-3 py-2 rounded-lg"
  placeholder="Location"
/> */}
   <input
  value={headline}
  onChange={(e) => setHeadline(e.target.value)}
  className="w-full border px-3 py-2 rounded-lg"
  placeholder="Headline"
/>
  <textarea
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  rows={4}
  className="w-full border px-3 py-2 rounded-lg"
  placeholder="Write a short bio about yourself"
/>
<input
  value={linkedin}
  onChange={(e) => setLinkedin(e.target.value)}
  className="w-full border px-3 py-2 rounded-lg"
  placeholder="LinkedIn Profile URL"
/>

<input
  value={github}
  onChange={(e) => setGithub(e.target.value)}
  className="w-full border px-3 py-2 rounded-lg"
  placeholder="GitHub Profile URL"
/>



    <div className="flex justify-end gap-3"> 
      <button onClick={() => setEditing(false)} className="border px-4 py-2 rounded-lg" > Cancel </button> 
 <button
  onClick={async () => {
  if (!user) return;

  //let uploadedURL = photoURL;

  // 🔥 Agar new photo select hui hai

  await updateDoc(doc(db, "users", user.uid), {
    name: name,
    //location: location,
    headline: headline,
    bio: bio,
    linkedin: linkedin,
    github: github,
    //photoURL: uploadedURL,
  });
  setEditing(false);
}}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
  Save
</button>
    </div> 
    </div> 
    </div>
   )}
    </div>
</div>
  );
}