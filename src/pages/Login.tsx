import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword,sendPasswordResetEmail,} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  // 🔥 already logged-in & verified user → dashboard
  useEffect(() => {
    if (!authLoading && user && user.emailVerified) {
      navigate("/app", { replace: true });
    }
  }, [user, authLoading]);

  const login = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setInfo("");

      await signInWithEmailAndPassword(auth, email, password);

      // 🔥 EMAIL VERIFICATION CHECK
const cred = await signInWithEmailAndPassword(auth, email, password);

// 🔄 reload user to get latest verification status
await cred.user.reload();

if (!cred.user.emailVerified) {

  await auth.signOut();

  setError("Please verify your email before logging in.(check SPAM also)");

  return;

}

      const user = auth.currentUser;
      await setDoc(
      doc(db, "users", user.uid),
      {
       email: user.email,
      lastLoginDate: new Date(),
      },
      { merge: true }
      );

      navigate("/app");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FORGOT PASSWORD (UNCHANGED)
  const forgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setInfo("");
      await sendPasswordResetEmail(auth, email);
      setInfo("Password reset link has been sent to your email");
    } catch {
      setError("Failed to send reset email. Check your email address.");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
  try {
    setLoading(true);
    setError("");
    setInfo("");

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    // 🔥 Firestore user ensure
    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email,
        name: user.displayName || "",
        plan: "Beginner",
        lastLoginDate: new Date(),
      },
      { merge: true }
    );

    navigate("/app");

  } catch (error) {
    setError("Google login failed");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-1">
          voice2career
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Welcome back 👋 Login to continue
        </p>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {/* INFO */}
        {info && (
          <div className="mb-4 text-sm text-green-600 bg-green-50 px-3 py-2 rounded">
            {info}
          </div>
        )}

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* FORGOT PASSWORD */}
        <div className="text-right mb-6">
          <button
            onClick={forgotPassword}
            disabled={loading}
            className="text-sm text-blue-600 hover:underline disabled:opacity-60"
          >
            Forgot password?
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

          <div className="my-6 flex items-center">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="flex-1 border-t"></div>
          </div>

          <button
          onClick={loginWithGoogle}
          disabled={loading}
         className="w-full border py-3 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-60"
          >
          Continue with Google
        </button>

        {/* FOOTER */}
        <p className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-medium cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
