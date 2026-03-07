import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {

  const { user, loading } = useAuth();
  const [checking, setChecking] = useState(true);
  const [banned, setBanned] = useState(false);

  useEffect(() => {

    const checkBanStatus = async () => {

      if (!user) {
        setChecking(false);
        return;
      }

      const snap = await getDoc(doc(db, "users", user.uid));

      if (snap.exists()) {

        const data = snap.data();

        if (data.banned === true) {
          setBanned(true);
        }

      }

      setChecking(false);

    };

    checkBanStatus();

  }, [user]);

  if (loading || checking) {
    return <div className="p-10">Loading...</div>;
  }

  // 🔴 USER BANNED
  if (banned) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Account Suspended
          </h1>
          <p className="text-gray-500">
            Your account has been banned by admin.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}