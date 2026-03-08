import { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const oobCode = searchParams.get("oobCode");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const rules = {
    length: password.length >= 9,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const allValid = Object.values(rules).every(Boolean);

  const resetPassword = async () => {

    if (!oobCode) {
      setError("Invalid reset link.");
      return;
    }

    if (!allValid) {
      setError("Password does not meet requirements.");
      return;
    }

    try {

      setLoading(true);
      setError("");

      await confirmPasswordReset(auth, oobCode, password);

      navigate("/login");

    } catch (err) {

      setError("Reset link expired or invalid.");

    } finally {

      setLoading(false);

    }
  };

  const Rule = ({ ok, text }: any) => (
    <li className={`text-sm ${ok ? "text-green-600" : "text-red-500"}`}>
      {ok ? "✓" : "✗"} {text}
    </li>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-xl font-bold mb-4">
          Reset Password
        </h1>

        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full border px-4 py-3 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <ul className="mb-6 space-y-1">

          <Rule ok={rules.length} text="Minimum 9 characters" />
          <Rule ok={rules.lowercase} text="1 lowercase letter" />
          <Rule ok={rules.uppercase} text="1 uppercase letter" />
          <Rule ok={rules.number} text="1 number" />
          <Rule ok={rules.special} text="1 special character" />

        </ul>

        <button
          disabled={!allValid || loading}
          onClick={resetPassword}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

      </div>

    </div>
  );
}