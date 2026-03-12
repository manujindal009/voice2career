import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { sendEmailVerification } from "firebase/auth";

function WaveIcon() {
  return (
    <svg viewBox="0 0 40 20" fill="none" width="26" height="13">
      {[0,4,8,12,16,20,24,28,32,36].map((x, i) => (
        <rect key={i} x={x} y={10 - [3,7,5,9,4,8,6,10,3,6][i]} width="3"
          height={[6,14,10,18,8,16,12,20,6,12][i]} rx="1.5" fill="currentColor"
          style={{ opacity: 0.55 + i * 0.045 }} />
      ))}
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

const FEATURES = [
  { icon: "🎙️", title: "AI Mock Interviews", desc: "Voice-based practice with real-time AI feedback", live: true },
  { icon: "📚", title: "Study Material",     desc: "Curated notes, guides & topic-wise resources",   live: true },
  { icon: "🧪", title: "Mock Tests",          desc: "Company-pattern tests just like the real thing", live: true },
  { icon: "📄", title: "Resume Analyzer",     desc: "AI-powered resume scoring & suggestions",        live: false },
];

export default function Login() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [info, setInfo]             = useState("");
  const [showResend, setShowResend] = useState(false);
  const [resending, setResending]   = useState(false);
  const [mounted, setMounted]       = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!authLoading && user && user.emailVerified)
      navigate("/app", { replace: true });
  }, [user, authLoading]);

  // ── BACKEND UNCHANGED ────────────────────────────────────────────
  const login = async () => {
    if (!email || !password) { setError("Please enter email and password"); return; }
    try {
      setLoading(true); setError(""); setInfo("");
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await cred.user.reload();
      if (!cred.user.emailVerified) {
        await auth.signOut();
        setError("Please verify your email before logging in (check spam folder).");
        setShowResend(true); return;
      }
      const user = auth.currentUser;
      await setDoc(
  doc(db, "users", user.uid),
  { lastLoginDate: new Date() },
  { merge: true }
);
if (!user) return;

const snap = await getDoc(doc(db, "users", user.uid));

if (snap.exists()) {
  const data = snap.data();

  const userData = {
    name: data.name || "",
    plan: data.plan || "Free"
  };

  localStorage.setItem("userData", JSON.stringify(userData));
}
      navigate("/app");
    } catch { setError("Invalid email or password"); }
    finally { setLoading(false); }
  };

  const forgotPassword = async () => {
    if (!email) { setError("Please enter your email to reset password"); return; }
    try {
      setLoading(true); setError(""); setInfo("");
      setInfo("Password reset link has been sent to your email");
    } catch { setError("Failed to send reset email. Check your email address."); }
    finally { setLoading(false); }
  };

  const resendVerification = async () => {
    if (!email || !password) { setError("Enter email and password first"); return; }
    try {
      setResending(true);
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user);
      await auth.signOut();
      setInfo("Verification email sent again. Please check your inbox.");
    } catch { setError("Unable to send verification email."); }
    setResending(false);
  };

  const loginWithGoogle = async () => {
  try {
    setLoading(true); 
    setError(""); 
    setInfo("");

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(
      doc(db, "users", user.uid),
      { lastLoginDate: new Date() },
      { merge: true }
    );

    // 🔥 fetch user data
    const snap = await getDoc(doc(db, "users", user.uid));

    if (snap.exists()) {
      const data = snap.data();

      const userData = {
        name: data.name || user.displayName || "",
        plan: data.plan || "Free"
      };

      localStorage.setItem("userData", JSON.stringify(userData));
    }

    navigate("/app");

  } catch {
    setError("Google login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .v2c-root {
          min-height: 100vh; background: #0a1628;
          display: grid; grid-template-columns: 1fr 1fr;
          font-family: 'Inter', sans-serif; overflow: hidden;
        }

        /* ══ LEFT ══ */
        .v2c-left {
          position: relative; display: flex; flex-direction: column;
          padding: 44px 48px; background: #0a1628;
          overflow: hidden; min-height: 100vh;
        }

        .v2c-left::after {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 65% 55% at 10% 5%,  rgba(59,130,246,.16) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 90% 95%, rgba(37,99,235,.10) 0%, transparent 60%);
          pointer-events: none;
        }

        .v2c-orb {
          position: absolute; width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,.10) 0%, transparent 65%);
          top: 45%; left: -10%; pointer-events: none; z-index: 0;
        }

        .v2c-brand {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 10px;
        }

        .v2c-brand-icon {
          width: 36px; height: 36px;
          background: rgba(59,130,246,.15);
          border: 1px solid rgba(59,130,246,.25);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: #60a5fa;
        }

        .v2c-brand-name {
          font-size: 1.05rem; font-weight: 700;
          color: #e0f2fe; letter-spacing: -.02em;
        }

        .v2c-hero {
          position: relative; z-index: 1; flex: 1;
          display: flex; flex-direction: column;
          justify-content: center; padding: 48px 0 36px;
        }

        .v2c-eyebrow {
          font-size: .68rem; font-weight: 700;
          letter-spacing: .15em; text-transform: uppercase;
          color: #60a5fa; margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
        }

        .v2c-eyebrow::before {
          content: ''; width: 26px; height: 1.5px;
          background: #60a5fa; border-radius: 2px; display: block;
        }

        .v2c-heading {
          font-size: clamp(2.2rem, 3.8vw, 3rem); font-weight: 900;
          line-height: 1.06; color: #fff; letter-spacing: -.05em; margin-bottom: 16px;
        }

        .v2c-heading span {
          background: linear-gradient(90deg, #60a5fa, #93c5fd);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .v2c-sub {
          font-size: .93rem; color: #64748b; line-height: 1.7;
          max-width: 360px; font-weight: 400; margin-bottom: 36px;
        }

        .v2c-features {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; max-width: 420px;
        }

        .v2c-feat {
          background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
          border-radius: 12px; padding: 14px 16px;
          display: flex; flex-direction: column; gap: 6px;
          transition: border-color .2s, background .2s;
        }

        .v2c-feat:hover { background: rgba(59,130,246,.06); border-color: rgba(59,130,246,.2); }

        .v2c-feat-top { display: flex; align-items: center; justify-content: space-between; }
        .v2c-feat-icon { font-size: 1.1rem; line-height: 1; }

        .v2c-feat-badge {
          font-size: .58rem; font-weight: 700; letter-spacing: .06em;
          text-transform: uppercase; padding: 2px 7px; border-radius: 999px;
        }

        .v2c-feat-badge--live { background: rgba(34,197,94,.12); color: #4ade80; border: 1px solid rgba(34,197,94,.2); }
        .v2c-feat-badge--soon { background: rgba(251,191,36,.10); color: #fbbf24; border: 1px solid rgba(251,191,36,.2); }

        .v2c-feat-title { font-size: .82rem; font-weight: 700; color: #e2e8f0; letter-spacing: -.01em; }
        .v2c-feat-desc  { font-size: .73rem; color: #475569; font-weight: 400; line-height: 1.4; }

        .v2c-stats {
          position: relative; z-index: 1; display: flex; align-items: center;
          border-top: 1px solid rgba(255,255,255,.06); padding-top: 28px;
        }

        .v2c-stat { flex: 1; display: flex; flex-direction: column; gap: 3px; }

        .v2c-stat-num {
          font-size: 1.5rem; font-weight: 900;
          color: #fff; letter-spacing: -.05em; line-height: 1;
        }

        .v2c-stat-label {
          font-size: .68rem; font-weight: 600;
          color: #334155; letter-spacing: .06em; text-transform: uppercase;
        }

        .v2c-stat-div {
          width: 1px; height: 32px; background: rgba(255,255,255,.07);
          margin: 0 20px; flex-shrink: 0;
        }

        /* ══ RIGHT ══ */
        .v2c-right {
          display: flex; align-items: center; justify-content: center;
          padding: 48px 40px; background: #fafafa;
        }

        .v2c-card {
          width: 100%; max-width: 400px;
          opacity: 0; transform: translateY(20px);
          transition: opacity .5s ease, transform .5s ease;
        }

        .v2c-card.v2c-card--in { opacity: 1; transform: translateY(0); }

        .v2c-card-header { margin-bottom: 36px; }

        .v2c-card-title {
          font-size: 1.85rem; font-weight: 900;
          color: #0f172a; letter-spacing: -.05em; margin-bottom: 6px;
        }

        .v2c-card-sub { font-size: .875rem; color: #64748b; font-weight: 400; }

        .v2c-alert {
          padding: 12px 14px; border-radius: 10px; font-size: .825rem;
          margin-bottom: 18px; display: flex; align-items: flex-start;
          gap: 8px; line-height: 1.5;
        }

        .v2c-alert--error   { background: #fff1f2; color: #be123c; border: 1px solid #fecdd3; }
        .v2c-alert--success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }

        .v2c-resend { text-align: center; margin-bottom: 16px; }

        .v2c-resend-btn {
          background: none; border: none; cursor: pointer; font-size: .8rem;
          color: #2563eb; font-family: 'Inter', sans-serif; font-weight: 600;
          text-decoration: underline; text-underline-offset: 3px; padding: 0;
        }

        .v2c-resend-btn:disabled { opacity: .5; cursor: default; }

        .v2c-field { margin-bottom: 18px; }

        .v2c-label {
          display: block; font-size: .72rem; font-weight: 700;
          color: #374151; letter-spacing: .07em; text-transform: uppercase; margin-bottom: 8px;
        }

        .v2c-input-wrap {
          position: relative; display: flex; align-items: center;
        }

        .v2c-input {
          width: 100%; padding: 13px 16px;
          border: 1.5px solid #e2e8f0; border-radius: 10px;
          font-size: .925rem; font-family: 'Inter', sans-serif;
          color: #0f172a; background: #fff; outline: none;
          transition: border-color .2s, box-shadow .2s;
        }

        .v2c-input--padded { padding-right: 44px; }
        .v2c-input::placeholder { color: #94a3b8; }
        .v2c-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.12); }

        .v2c-eye {
          position: absolute; right: 14px;
          background: none; border: none; cursor: pointer;
          padding: 0; display: flex; align-items: center;
          color: #94a3b8; transition: color .15s;
        }

        .v2c-eye:hover { color: #475569; }

        .v2c-forgot-row {
          display: flex; justify-content: flex-end;
          margin-top: -8px; margin-bottom: 26px;
        }

        .v2c-forgot-btn {
          background: none; border: none; cursor: pointer; font-size: .8rem;
          color: #2563eb; font-family: 'Inter', sans-serif; font-weight: 600; padding: 0;
        }

        .v2c-forgot-btn:hover { text-decoration: underline; text-underline-offset: 3px; }
        .v2c-forgot-btn:disabled { opacity: .5; cursor: default; }

        .v2c-btn-primary {
          width: 100%; padding: 14px; border: none; border-radius: 10px;
          background: #2563eb; color: #fff; font-size: .95rem; font-weight: 700;
          font-family: 'Inter', sans-serif; cursor: pointer; letter-spacing: -.01em;
          transition: background .15s, transform .15s, box-shadow .15s, opacity .2s;
          box-shadow: 0 4px 20px rgba(37,99,235,.35);
        }

        .v2c-btn-primary:hover:not(:disabled) {
          background: #1d4ed8; transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(37,99,235,.45);
        }

        .v2c-btn-primary:active:not(:disabled) { transform: translateY(0); }
        .v2c-btn-primary:disabled { opacity: .6; cursor: default; }

        .v2c-divider {
          display: flex; align-items: center; gap: 12px; margin: 22px 0;
          color: #94a3b8; font-size: .75rem; font-weight: 600;
          letter-spacing: .08em; text-transform: uppercase;
        }

        .v2c-divider::before, .v2c-divider::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }

        .v2c-btn-google {
          width: 100%; padding: 13px; border: 1.5px solid #e2e8f0; border-radius: 10px;
          background: #fff; color: #374151; font-size: .9rem; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer;
          transition: background .15s, border-color .15s, transform .15s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }

        .v2c-btn-google:hover:not(:disabled) { background: #f8fafc; border-color: #cbd5e1; transform: translateY(-1px); }
        .v2c-btn-google:disabled { opacity: .6; cursor: default; }

        .v2c-spinner {
          display: inline-block; width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,.4); border-top-color: #fff;
          border-radius: 50%; animation: spin .6s linear infinite;
          vertical-align: middle; margin-right: 6px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .v2c-footer { margin-top: 28px; text-align: center; font-size: .85rem; color: #64748b; }
        .v2c-footer-link { color: #2563eb; font-weight: 700; cursor: pointer; }
        .v2c-footer-link:hover { text-decoration: underline; text-underline-offset: 3px; }

        @media (max-width: 768px) {
          .v2c-root { grid-template-columns: 1fr; }
          .v2c-left { display: none; }
          .v2c-right { background: #0a1628; padding: 32px 24px; }
          .v2c-card-title { color: #f1f5f9; }
          .v2c-card-sub { color: #94a3b8; }
          .v2c-label { color: #94a3b8; }
          .v2c-input { background: #0d1f3c; border-color: #1e3a5f; color: #f1f5f9; }
          .v2c-input::placeholder { color: #334155; }
          .v2c-input:focus { border-color: #2563eb; }
          .v2c-divider::before, .v2c-divider::after { background: #1e3a5f; }
          .v2c-btn-google { background: #0d1f3c; border-color: #1e3a5f; color: #94a3b8; }
          .v2c-footer { color: #475569; }
        }
      `}</style>

      <div className="v2c-root">

        {/* ── LEFT ── */}
        <div className="v2c-left">
          <div className="v2c-orb" />

          <div className="v2c-brand">
            <div className="v2c-brand-icon"><WaveIcon /></div>
            <span className="v2c-brand-name">voice2career</span>
          </div>

          <div className="v2c-hero">
            <div className="v2c-eyebrow">Your Complete Career Platform</div>
            <h2 className="v2c-heading">
              Everything you need<br />
              to <span>crack your</span><br />
              dream job.
            </h2>
            <p className="v2c-sub">
              From study material to mock tests, AI interviews to resume analysis — we've got every step of your placement journey covered.
            </p>

            <div className="v2c-features">
              {FEATURES.map((f) => (
                <div className="v2c-feat" key={f.title}>
                  <div className="v2c-feat-top">
                    <span className="v2c-feat-icon">{f.icon}</span>
                    <span className={`v2c-feat-badge ${f.live ? "v2c-feat-badge--live" : "v2c-feat-badge--soon"}`}>
                      {f.live ? "Live" : "Soon"}
                    </span>
                  </div>
                  <div className="v2c-feat-title">{f.title}</div>
                  <div className="v2c-feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="v2c-stats">
            <div className="v2c-stat">
              <span className="v2c-stat-num">100+</span>
              <span className="v2c-stat-label">Users Placed</span>
            </div>
            <div className="v2c-stat-div" />
            <div className="v2c-stat">
              <span className="v2c-stat-num">95%</span>
              <span className="v2c-stat-label">Success Rate</span>
            </div>
            <div className="v2c-stat-div" />
            <div className="v2c-stat">
              <span className="v2c-stat-num">5+</span>
              <span className="v2c-stat-label">Partner Companies</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="v2c-right">
          <div className={`v2c-card ${mounted ? "v2c-card--in" : ""}`}>
            <div className="v2c-card-header">
              <h1 className="v2c-card-title">Welcome back</h1>
              <p className="v2c-card-sub">Sign in to continue your journey</p>
            </div>

            {error && <div className="v2c-alert v2c-alert--error"><span>⚠</span><span>{error}</span></div>}

            {showResend && (
              <div className="v2c-resend">
                <button onClick={resendVerification} disabled={resending} className="v2c-resend-btn">
                  {resending ? "Sending…" : "Resend verification email"}
                </button>
              </div>
            )}

            {info && <div className="v2c-alert v2c-alert--success"><span>✓</span><span>{info}</span></div>}

            {/* Email */}
            <div className="v2c-field">
              <label className="v2c-label">Email</label>
              <div className="v2c-input-wrap">
                <input type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" className="v2c-input" />
              </div>
            </div>

            {/* Password */}
            <div className="v2c-field">
              <label className="v2c-label">Password</label>
              <div className="v2c-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="v2c-input v2c-input--padded"
                />
                <button type="button" className="v2c-eye"
                  onClick={() => setShowPassword(p => !p)}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            <div className="v2c-forgot-row">
              <button onClick={forgotPassword} disabled={loading} className="v2c-forgot-btn">
                Forgot password?
              </button>
            </div>

            <button onClick={login} disabled={loading} className="v2c-btn-primary">
              {loading ? <><span className="v2c-spinner" />Signing in…</> : "Sign In →"}
            </button>

            <div className="v2c-divider">or</div>

            <button onClick={loginWithGoogle} disabled={loading} className="v2c-btn-google">
              <GoogleIcon /> Continue with Google
            </button>

            <p className="v2c-footer">
              Don't have an account?{" "}
              <span onClick={() => navigate("/signup")} className="v2c-footer-link">Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}