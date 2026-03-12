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

export default function Signup() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [name, setName]                       = useState("");
  const [email, setEmail]                     = useState("");
  const [password, setPassword]               = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched]                 = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState("");
  const [info, setInfo]                       = useState("");
  const [resendLoading, setResendLoading]     = useState(false);
  const [mounted, setMounted]                 = useState(false);
  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!authLoading && user && user.emailVerified)
      navigate("/app", { replace: true });
  }, [user, authLoading]);

  const rules = {
    length:    password.length >= 9,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number:    /[0-9]/.test(password),
    special:   /[^A-Za-z0-9]/.test(password),
  };

  const allValid = Object.values(rules).every(Boolean);

  const signup = async () => {
    if (!name || !email || !password) { setError("All fields are required"); return; }
    if (!allValid) { setError("Password does not meet requirements"); return; }
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }
    try {
      setLoading(true); setError(""); setInfo("");
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      await setDoc(doc(db, "users", cred.user.uid), {
        name, email, plan: "Free", banned: false,
        emailVerified: false, loginStreak: 1,
        lastLoginDate: new Date(), createdAt: new Date(),
      });
      await sendEmailVerification(cred.user);
      await auth.signOut();
      navigate("/login", {
        state: { message: "Verification email sent. Please verify your email before logging in.(check spam also)" }
      });
    } catch (err: any) { setError(err.message || "Signup failed"); }
    finally { setLoading(false); }
  };

  const signupWithGoogle = async () => {
    try {
      setLoading(true); setError(""); setInfo("");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "", email: user.email,
        plan: "Free", loginStreak: 1,
        lastLoginDate: new Date(), createdAt: new Date(),
      }, { merge: true });
      navigate("/app");
    } catch (err: any) { setError("Google signup failed"); }
    finally { setLoading(false); }
  };

  const resendVerification = async () => {
    try {
      setResendLoading(true); setError(""); setInfo("");
      if (!auth.currentUser) { setError("Please login again to resend verification email."); return; }
      await sendEmailVerification(auth.currentUser);
      setInfo("Verification email sent again. Please check your inbox.");
    } catch (err: any) { setError("Failed to resend verification email."); }
    finally { setResendLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .su-root {
          min-height: 100vh; background: #0a1628;
          display: grid; grid-template-columns: 1fr 1fr;
          font-family: 'Inter', sans-serif; overflow: hidden;
        }

        /* ══ LEFT ══ */
        .su-left {
          position: relative; display: flex; flex-direction: column;
          padding: 44px 48px; background: #0a1628;
          overflow: hidden; min-height: 100vh;
        }

        .su-left::after {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 65% 55% at 10% 5%,  rgba(59,130,246,.16) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 90% 95%, rgba(37,99,235,.10) 0%, transparent 60%);
          pointer-events: none;
        }

        .su-orb {
          position: absolute; width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,.10) 0%, transparent 65%);
          top: 45%; left: -10%; pointer-events: none; z-index: 0;
        }

        .su-brand {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 10px;
        }

        .su-brand-icon {
          width: 36px; height: 36px;
          background: rgba(59,130,246,.15);
          border: 1px solid rgba(59,130,246,.25);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: #60a5fa;
        }

        .su-brand-name {
          font-size: 1.05rem; font-weight: 700;
          color: #e0f2fe; letter-spacing: -.02em;
        }

        .su-hero {
          position: relative; z-index: 1; flex: 1;
          display: flex; flex-direction: column;
          justify-content: center; padding: 48px 0 36px;
        }

        .su-eyebrow {
          font-size: .68rem; font-weight: 700;
          letter-spacing: .15em; text-transform: uppercase;
          color: #60a5fa; margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
        }

        .su-eyebrow::before {
          content: ''; width: 26px; height: 1.5px;
          background: #60a5fa; border-radius: 2px; display: block;
        }

        .su-heading {
          font-size: clamp(2.2rem, 3.8vw, 3rem); font-weight: 900;
          line-height: 1.06; color: #fff; letter-spacing: -.05em; margin-bottom: 16px;
        }

        .su-heading span {
          background: linear-gradient(90deg, #60a5fa, #93c5fd);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .su-sub {
          font-size: .93rem; color: #64748b; line-height: 1.7;
          max-width: 360px; font-weight: 400; margin-bottom: 36px;
        }

        .su-features {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; max-width: 420px;
        }

        .su-feat {
          background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
          border-radius: 12px; padding: 14px 16px;
          display: flex; flex-direction: column; gap: 6px;
          transition: border-color .2s, background .2s;
        }

        .su-feat:hover { background: rgba(59,130,246,.06); border-color: rgba(59,130,246,.2); }

        .su-feat-top { display: flex; align-items: center; justify-content: space-between; }
        .su-feat-icon { font-size: 1.1rem; line-height: 1; }

        .su-feat-badge {
          font-size: .58rem; font-weight: 700; letter-spacing: .06em;
          text-transform: uppercase; padding: 2px 7px; border-radius: 999px;
        }

        .su-feat-badge--live { background: rgba(34,197,94,.12); color: #4ade80; border: 1px solid rgba(34,197,94,.2); }
        .su-feat-badge--soon { background: rgba(251,191,36,.10); color: #fbbf24; border: 1px solid rgba(251,191,36,.2); }

        .su-feat-title { font-size: .82rem; font-weight: 700; color: #e2e8f0; letter-spacing: -.01em; }
        .su-feat-desc  { font-size: .73rem; color: #475569; line-height: 1.4; }

        .su-stats {
          position: relative; z-index: 1; display: flex; align-items: center;
          border-top: 1px solid rgba(255,255,255,.06); padding-top: 28px;
        }

        .su-stat { flex: 1; display: flex; flex-direction: column; gap: 3px; }

        .su-stat-num {
          font-size: 1.5rem; font-weight: 900;
          color: #fff; letter-spacing: -.05em; line-height: 1;
        }

        .su-stat-label {
          font-size: .68rem; font-weight: 600;
          color: #334155; letter-spacing: .06em; text-transform: uppercase;
        }

        .su-stat-div {
          width: 1px; height: 32px; background: rgba(255,255,255,.07);
          margin: 0 20px; flex-shrink: 0;
        }

        /* ══ RIGHT ══ */
        .su-right {
          display: flex; align-items: center; justify-content: center;
          padding: 40px; background: #fafafa; overflow-y: auto;
        }

        .su-card {
          width: 100%; max-width: 400px;
          opacity: 0; transform: translateY(20px);
          transition: opacity .5s ease, transform .5s ease;
        }

        .su-card.su-card--in { opacity: 1; transform: translateY(0); }

        .su-card-header { margin-bottom: 28px; }

        .su-card-title {
          font-size: 1.85rem; font-weight: 900;
          color: #0f172a; letter-spacing: -.05em; margin-bottom: 6px;
        }

        .su-card-sub { font-size: .875rem; color: #64748b; font-weight: 400; }

        .su-alert {
          padding: 12px 14px; border-radius: 10px; font-size: .825rem;
          margin-bottom: 16px; display: flex; align-items: flex-start;
          gap: 8px; line-height: 1.5;
        }

        .su-alert--error   { background: #fff1f2; color: #be123c; border: 1px solid #fecdd3; }
        .su-alert--success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }

        .su-resend { text-align: center; margin-bottom: 14px; }

        .su-resend-btn {
          background: none; border: none; cursor: pointer; font-size: .8rem;
          color: #2563eb; font-family: 'Inter', sans-serif; font-weight: 600;
          text-decoration: underline; text-underline-offset: 3px; padding: 0;
        }

        .su-resend-btn:disabled { opacity: .5; cursor: default; }

        .su-field { margin-bottom: 14px; }

        .su-label {
          display: block; font-size: .72rem; font-weight: 700;
          color: #374151; letter-spacing: .07em; text-transform: uppercase; margin-bottom: 7px;
        }

        .su-input-wrap { position: relative; display: flex; align-items: center; }

        .su-input {
          width: 100%; padding: 12px 16px;
          border: 1.5px solid #e2e8f0; border-radius: 10px;
          font-size: .925rem; font-family: 'Inter', sans-serif;
          color: #0f172a; background: #fff; outline: none;
          transition: border-color .2s, box-shadow .2s;
        }

        .su-input--padded { padding-right: 44px; }
        .su-input::placeholder { color: #94a3b8; }
        .su-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.12); }

        .su-input--error { border-color: #ef4444 !important; box-shadow: 0 0 0 3px rgba(239,68,68,.12) !important; }
        .su-input--ok    { border-color: #16a34a !important; box-shadow: 0 0 0 3px rgba(22,163,74,.10) !important; }

        .su-eye {
          position: absolute; right: 14px; background: none; border: none;
          cursor: pointer; padding: 0; display: flex; align-items: center;
          color: #94a3b8; transition: color .15s;
        }

        .su-eye:hover { color: #475569; }

        .su-match-error { margin-top: 6px; font-size: .73rem; font-weight: 600; color: #dc2626; }
        .su-match-ok    { margin-top: 6px; font-size: .73rem; font-weight: 600; color: #16a34a; }

        .su-rules { margin-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 5px 12px; }

        .su-rule { display: flex; align-items: center; gap: 5px; font-size: .73rem; font-weight: 500; transition: color .2s; }
        .su-rule--ok  { color: #16a34a; }
        .su-rule--bad { color: #dc2626; }

        .su-rule-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; transition: background .2s; }
        .su-rule--ok  .su-rule-dot { background: #16a34a; }
        .su-rule--bad .su-rule-dot { background: #dc2626; }

        .su-btn-primary {
          width: 100%; padding: 14px; border: none; border-radius: 10px;
          background: #2563eb; color: #fff; font-size: .95rem; font-weight: 700;
          font-family: 'Inter', sans-serif; cursor: pointer; letter-spacing: -.01em;
          transition: background .15s, transform .15s, box-shadow .15s, opacity .2s;
          box-shadow: 0 4px 20px rgba(37,99,235,.35); margin-top: 18px;
        }

        .su-btn-primary:hover:not(:disabled) {
          background: #1d4ed8; transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(37,99,235,.45);
        }

        .su-btn-primary:active:not(:disabled) { transform: translateY(0); }
        .su-btn-primary:disabled { opacity: .5; cursor: default; }

        .su-divider {
          display: flex; align-items: center; gap: 12px; margin: 18px 0;
          color: #94a3b8; font-size: .75rem; font-weight: 600;
          letter-spacing: .08em; text-transform: uppercase;
        }

        .su-divider::before, .su-divider::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }

        .su-btn-google {
          width: 100%; padding: 13px; border: 1.5px solid #e2e8f0; border-radius: 10px;
          background: #fff; color: #374151; font-size: .9rem; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer;
          transition: background .15s, border-color .15s, transform .15s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }

        .su-btn-google:hover:not(:disabled) { background: #f8fafc; border-color: #cbd5e1; transform: translateY(-1px); }
        .su-btn-google:disabled { opacity: .6; cursor: default; }

        .su-spinner {
          display: inline-block; width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,.4); border-top-color: #fff;
          border-radius: 50%; animation: spin .6s linear infinite;
          vertical-align: middle; margin-right: 6px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .su-footer { margin-top: 22px; text-align: center; font-size: .85rem; color: #64748b; }
        .su-footer-link { color: #2563eb; font-weight: 700; cursor: pointer; }
        .su-footer-link:hover { text-decoration: underline; text-underline-offset: 3px; }

        @media (max-width: 768px) {
          .su-root { grid-template-columns: 1fr; }
          .su-left { display: none; }
          .su-right { background: #0a1628; padding: 32px 24px; }
          .su-card-title { color: #f1f5f9; }
          .su-card-sub { color: #94a3b8; }
          .su-label { color: #94a3b8; }
          .su-input { background: #0d1f3c; border-color: #1e3a5f; color: #f1f5f9; }
          .su-input::placeholder { color: #334155; }
          .su-input:focus { border-color: #2563eb; }
          .su-divider::before, .su-divider::after { background: #1e3a5f; }
          .su-btn-google { background: #0d1f3c; border-color: #1e3a5f; color: #94a3b8; }
          .su-footer { color: #475569; }
        }
      `}</style>

      <div className="su-root">

        {/* ── LEFT ── */}
        <div className="su-left">
          <div className="su-orb" />

          <div className="su-brand">
            <div className="su-brand-icon"><WaveIcon /></div>
            <span className="su-brand-name">voice2career</span>
          </div>

          <div className="su-hero">
            <div className="su-eyebrow">Your Complete Career Platform</div>
            <h2 className="su-heading">
              Everything you need<br />
              to <span>crack your</span><br />
              dream job.
            </h2>
            <p className="su-sub">
              From study material to mock tests, AI interviews to resume analysis — we've got every step of your placement journey covered.
            </p>

            <div className="su-features">
              {[
                { icon: "🎙️", title: "AI Mock Interviews", desc: "Voice practice with real-time AI feedback" },
                { icon: "📚", title: "Study Material",     desc: "Curated notes & topic-wise resources" },
                { icon: "🧪", title: "Mock Tests",         desc: "Company-pattern tests, just like real ones" },
                { icon: "📄", title: "Resume Analyzer",    desc: "AI resume scoring & suggestions", soon: true },
              ].map((f) => (
                <div className="su-feat" key={f.title}>
                  <div className="su-feat-top">
                    <span className="su-feat-icon">{f.icon}</span>
                    <span className={`su-feat-badge ${f.soon ? "su-feat-badge--soon" : "su-feat-badge--live"}`}>
                      {f.soon ? "Soon" : "Live"}
                    </span>
                  </div>
                  <div className="su-feat-title">{f.title}</div>
                  <div className="su-feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="su-stats">
            <div className="su-stat">
              <span className="su-stat-num">100+</span>
              <span className="su-stat-label">Users Placed</span>
            </div>
            <div className="su-stat-div" />
            <div className="su-stat">
              <span className="su-stat-num">95%</span>
              <span className="su-stat-label">Success Rate</span>
            </div>
            <div className="su-stat-div" />
            <div className="su-stat">
              <span className="su-stat-num">5+</span>
              <span className="su-stat-label">Partner Companies</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="su-right">
          <div className={`su-card ${mounted ? "su-card--in" : ""}`}>

            <div className="su-card-header">
              <h1 className="su-card-title">Create account</h1>
              <p className="su-card-sub">Start your placement journey 🚀</p>
            </div>

            {error && <div className="su-alert su-alert--error"><span>⚠</span><span>{error}</span></div>}
            {info  && <div className="su-alert su-alert--success"><span>✓</span><span>{info}</span></div>}

            {info.includes("Verification email") && (
              <div className="su-resend">
                <button onClick={resendVerification} disabled={resendLoading} className="su-resend-btn">
                  {resendLoading ? "Sending…" : "Resend Verification Email"}
                </button>
              </div>
            )}

            {/* Full Name */}
            <div className="su-field">
              <label className="su-label">Full Name</label>
              <div className="su-input-wrap">
                <input className="su-input" placeholder="John Dee"
                  value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>

            {/* Email */}
            <div className="su-field">
              <label className="su-label">Email</label>
              <div className="su-input-wrap">
                <input className="su-input" placeholder="you@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            {/* Password */}
            <div className="su-field">
              <label className="su-label">Password</label>
              <div className="su-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  className="su-input su-input--padded"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setTouched(true); }}
                />
                <button type="button" className="su-eye" onClick={() => setShowPassword(p => !p)}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {touched && (
                <div className="su-rules">
                  {[
                    { ok: rules.length,    text: "9+ characters" },
                    { ok: rules.lowercase, text: "Lowercase letter" },
                    { ok: rules.uppercase, text: "Uppercase letter" },
                    { ok: rules.number,    text: "Number" },
                    { ok: rules.special,   text: "Special character" },
                  ].map((r) => (
                    <div key={r.text} className={`su-rule ${r.ok ? "su-rule--ok" : "su-rule--bad"}`}>
                      <span className="su-rule-dot" />{r.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="su-field">
              <label className="su-label">Confirm Password</label>
              <div className="su-input-wrap">
                <input
                  type={showConfirm ? "text" : "password"}
                  className={`su-input su-input--padded ${
                    confirmPassword && password !== confirmPassword ? "su-input--error" : ""
                  } ${
                    confirmPassword && password === confirmPassword && allValid ? "su-input--ok" : ""
                  }`}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="button" className="su-eye" onClick={() => setShowConfirm(p => !p)}>
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <div className="su-match-error">✗ Passwords do not match</div>
              )}
              {confirmPassword && password === confirmPassword && allValid && (
                <div className="su-match-ok">✓ Passwords match</div>
              )}
            </div>

            <button
              onClick={signup}
              disabled={!allValid || loading || password !== confirmPassword || !confirmPassword}
              className="su-btn-primary"
            >
              {loading ? <><span className="su-spinner" />Creating account…</> : "Create Account →"}
            </button>

            <div className="su-divider">or</div>

            <button onClick={signupWithGoogle} disabled={loading} className="su-btn-google">
              <GoogleIcon /> Continue with Google
            </button>

            <p className="su-footer">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")} className="su-footer-link">Sign in</span>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}