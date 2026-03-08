import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {

  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [info, setInfo] = useState("");

  const user = auth.currentUser;

  // 🔥 auto check verification every 3 sec
  useEffect(() => {

    const interval = setInterval(async () => {

      if (!auth.currentUser) return;

      await auth.currentUser.reload();

      if (auth.currentUser.emailVerified) {
        navigate("/app");
      }

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  const resend = async () => {

    if (!user) return;

    try {
      setSending(true);

      await sendEmailVerification(user);

      setInfo("Verification email sent again. Check inbox.");

    } catch {
      setInfo("Failed to send email.");
    }

    setSending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">

      <div className="bg-white max-w-md w-full rounded-xl shadow-lg p-8 text-center">

        <h1 className="text-2xl font-bold mb-2">
          Verify your email
        </h1>

        <p className="text-gray-500 mb-6">
          We sent a verification link to your email.
          Please verify your email to continue.
        </p>

        <button
          onClick={resend}
          disabled={sending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          {sending ? "Sending..." : "Resend Verification Email"}
        </button>

        {info && (
          <p className="text-sm text-green-600 mt-4">
            {info}
          </p>
        )}

        <p className="text-sm text-gray-400 mt-6">
          After verifying, this page will automatically continue.
        </p>

      </div>

    </div>
  );
}