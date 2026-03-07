import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { user, loading } = useAuth();

  // 🔄 Jab tak Firebase auth resolve ho raha hai
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ✅ Login ho chuka hai → Dashboard
  if (user) {
    return <Navigate to="/app" replace />;
  }

  // ❌ Login nahi hai → Login page
  return <Navigate to="/login" replace />;
}
