/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Sparkles, Phone } from "lucide-react";
import { saveUser } from "@/lib/saveUser";

// 🔥 DEV MODE ONLY: disable app verification
(auth as any).settings.appVerificationDisabledForTesting = true;

export default function PhoneLogin() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] =
    useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    try {
      setLoading(true);

      const result = await signInWithPhoneNumber(
        auth,
        phone,
        // 👇 fake verifier (Firebase handles internally)
        (auth as any)
      );

      setConfirmation(result);
    } catch (e: any) {
      alert(e.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!confirmation) {
      alert("OTP not requested yet");
      return;
    }

    try {
      setLoading(true);

      await confirmation.confirm(otp);
      await saveUser("phone");

      navigate("/app", { replace: true });
    } catch (e: any) {
      alert(e.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="gradient-hero min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-xl p-6 text-center shadow-xl">
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-foreground/80 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Dev Phone Login
          </span>
        </div>

        <h1 className="text-2xl font-bold text-primary-foreground mb-2">
          Verify your phone
        </h1>

        <p className="text-sm text-primary-foreground/70 mb-6">
          Use test phone number
        </p>

        {!confirmation ? (
          <>
            <input
              className="w-full p-3 rounded-lg border border-primary/20 bg-background mb-4 text-center"
              placeholder="+911234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Button
              className="w-full"
              variant="hero"
              disabled={loading}
              onClick={sendOtp}
            >
              <Phone className="w-4 h-4 mr-2" />
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </>
        ) : (
          <>
            <input
              className="w-full p-3 rounded-lg border border-primary/20 bg-background mb-4 text-center"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button
              className="w-full"
              variant="hero"
              disabled={loading}
              onClick={verifyOtp}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
*/