import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut, deleteUser } from "firebase/auth";
import { doc, deleteDoc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
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

const handleProUpgrade = () => {
  if (!user) return;

  const subject = encodeURIComponent("Pro Plan Subscription Request");

  const body = encodeURIComponent(`
Hello Voice2Career Team,

I would like to subscribe to the Pro Plan (₹149/month).

User Details:
Name: ${name}
Email: ${user?.email}

Please share payment instructions.

Thanks,
${name}
`);

  window.location.href =
    `mailto:voice2career@yahoo.com?subject=${subject}&body=${body}`;
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-6">
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
                <p>📍 {location}</p>
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
            <p className="text-gray-600 leading-relaxed">
              {bio}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur border border-gray-200 p-8 rounded-3xl shadow-md hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4">
              Social Links
            </h2>

            <div className="flex flex-col gap-3">
              <button className="bg-blue-50/70 border border-blue-100 text-blue-600 px-4 py-2 rounded-lg">
                LinkedIn
              </button>

              <button className="bg-gray-100 border px-4 py-2 rounded-lg">
                GitHub
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
  <h2 className="text-lg font-semibold mb-6">
    Accuracy Growth
  </h2>

  {plan !== "Pro" ? (
    <div className="text-center text-gray-400 py-10">
      🔒 Upgrade to Pro to unlock detailed analytics
    </div>
  ) : (
    <div className="flex items-end gap-4 h-[240px]">
      {accuracyHistory.length === 0 ? (
        <p className="text-gray-400 text-sm">
          No test data available
        </p>
      ) : (
        accuracyHistory
          .slice(-10)
          .map((acc, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="bg-gradient-to-t from-blue-600 to-cyan-400 w-8 rounded-md transition-all duration-500 shadow-md"
                style={{
                  height: `${(acc / 100) * 200}px`,
                }}
              />
              <span className="text-xs mt-2">
                {acc}%
              </span>
            </div>
          ))
      )}
    </div>
  )}
</div>

        {/* WEAKEST */}
        <div className="bg-white p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

          <h2 className="text-lg font-semibold mb-4">
            Weakest Section
          </h2>

          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
            <p className="text-red-600 font-semibold">
  {weakest}
</p>

<p className="text-red-500 text-sm mt-1">
  Most frequently weak topic based on your mock tests
</p>
          </div>

          <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-2xl mt-4 text-sm text-blue-700">
            Suggestion: Focus more on this topic in upcoming mock tests.
          </div>
        </div>


{/* BADGES */}
<div className="bg-white p-6 rounded-2xl shadow space-y-4">
  <h2 className="text-lg font-semibold">
    Achievements
  </h2>

  {badges.length === 0 ? (
    <p className="text-gray-400 text-sm">
      No badges earned yet
    </p>
  ) : (
    <div className="flex flex-wrap gap-3">
      {badges.map((badge, i) => (
        <div
          key={i}
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm font-semibold shadow-md"
        >
          {badge}
        </div>
      ))}
    </div>
  )}
</div>

{/* PERFORMANCE INSIGHTS */}
<div className="bg-white/80 backdrop-blur border border-gray-200 p-8 rounded-3xl shadow-md space-y-4">
  <h2 className="text-lg font-semibold">
    Performance Insights
  </h2>

  <p className="text-sm text-gray-600">
    You have completed {mockTests} mock tests.
  </p>

  <p className="text-sm text-gray-600">
    Your average accuracy is {avgAccuracy}%.
  </p>

  <p className="text-sm text-gray-600">
    Focus on improving {weakest}.
  </p>

  <p className="text-sm text-gray-600">
  Trend: {trend}
</p>

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
        $0 <span className="text-sm font-normal">/month</span>
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
  onClick={handleProUpgrade}
  className={`mt-6 w-full py-2 rounded-lg ${
    plan === "Pro"
      ? "bg-blue-600 text-white"
      : "bg-gray-200"
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
    onClick={() => navigate("/dashboard")}
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
<input
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  className="w-full border px-3 py-2 rounded-lg"
  placeholder="Location"
/>
   <input
  value={headline}
  onChange={(e) => setHeadline(e.target.value)}
  className="w-full border px-3 py-2 rounded-lg"
  placeholder="Headline"
/>
   <textarea
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  className="w-full border px-3 py-2 rounded-lg"
  placeholder="About"
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
    location: location,
    headline: headline,
    bio: bio,
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