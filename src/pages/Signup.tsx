import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";


export default function Signup() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState(""); // 🔥 ADD
  const [resendLoading, setResendLoading] = useState(false);

  // 🔥 already logged-in user → dashboard
  useEffect(() => {
    if (!authLoading && user) {
      navigate("/app", { replace: true });
    }
  }, [user, authLoading]);

  const rules = {
    length: password.length >= 9,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const allValid = Object.values(rules).every(Boolean);

  const signup = async () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    if (!allValid) {
      setError("Password does not meet requirements");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setInfo("");

      const cred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update display name
      await updateProfile(cred.user, {
        displayName: name,
      });

      // Save user to Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
  name,
  email,
  plan: "Free",
  banned: false,
  emailVerified: false,
  loginStreak: 1,
  lastLoginDate: new Date(),
  createdAt: new Date(),
});

      // 🔥 SEND VERIFICATION EMAIL
      await sendEmailVerification(cred.user);

      // 🔐 Logout until verified
     // await auth.signOut();

      setInfo(
        "Verification email sent. Please verify your email before logging in."
      );
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const signupWithGoogle = async () => {
  try {
    setLoading(true);
    setError("");
    setInfo("");

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    // Firestore user document ensure
    await setDoc(
      doc(db, "users", user.uid),
      {
        name: user.displayName || "",
        email: user.email,
        plan: "Free",
        loginStreak: 1,
        lastLoginDate: new Date(),
        createdAt: new Date(),
      },
      { merge: true }
    );

    navigate("/app");

  } catch (err: any) {
    setError("Google signup failed");
  } finally {
    setLoading(false);
  }
};

const resendVerification = async () => {
  try {
    setResendLoading(true);
    setError("");
    setInfo("");

    if (!auth.currentUser) {
      setError("Please login again to resend verification email.");
      return;
    }

    await sendEmailVerification(auth.currentUser);

    setInfo("Verification email sent again. Please check your inbox.");

  } catch (err: any) {
    setError("Failed to resend verification email.");
  } finally {
    setResendLoading(false);
  }
};


  const Rule = ({ ok, text }: { ok: boolean; text: string }) => (
    <li className={`text-sm ${ok ? "text-green-600" : "text-red-500"}`}>
      {ok ? "✓" : "✗"} {text}
    </li>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-1">
          Create an account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Start your placement journey 🚀
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {info && (
          <div className="mb-4 text-sm text-green-700 bg-green-50 px-3 py-2 rounded">
            {info}
          </div>
        )}

        {info.includes("Verification email") && (
  <div className="mb-4 text-center">
    <button
      onClick={resendVerification}
      disabled={resendLoading}
      className="text-sm text-blue-600 hover:underline disabled:opacity-50"
    >
      {resendLoading ? "Sending..." : "Resend Verification Email"}
    </button>
  </div>
)}

        <input
          className="w-full mb-4 border rounded-lg px-4 py-3"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-4 border rounded-lg px-4 py-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 border rounded-lg px-4 py-3"
          placeholder="Create strong password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setTouched(true);
          }}
        />

        {touched && (
          <ul className="mb-6 space-y-1">
            <Rule ok={rules.length} text="Minimum 9 characters" />
            <Rule ok={rules.lowercase} text="1 lowercase letter" />
            <Rule ok={rules.uppercase} text="1 uppercase letter" />
            <Rule ok={rules.number} text="1 number" />
            <Rule ok={rules.special} text="1 special character" />
          </ul>
        )}

        <button
          disabled={!allValid || loading}
          onClick={signup}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <div className="my-6 flex items-center">
  <div className="flex-1 border-t"></div>
  <span className="px-3 text-sm text-gray-400">or</span>
  <div className="flex-1 border-t"></div>
</div>

<button
  onClick={signupWithGoogle}
  disabled={loading}
  className="w-full border py-3 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-60"
>
  Continue with Google
</button>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
