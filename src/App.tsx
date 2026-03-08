import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StudyFolder from "@/pages/StudyFolder";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import StudyTopic from "@/pages/StudyTopic";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Marksheet from "@/pages/Marksheet";
import Signup from "@/pages/Signup";
import AdminLayout from "@/components/AdminLayout";
import { lazy, Suspense } from "react";
import About from "@/pages/About";
import VerifyEmail from "@/pages/VerifyEmail";
import AuthGuard from "@/components/AuthGuard";
import ResetPassword from "./pages/ResetPassword";
import InterviewDetails from "@/pages/InterviewDetails";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
 import InterviewCompleted from "@/pages/InterviewCompleted";
import StudyReader from "@/pages/StudyReader";
import Result from "@/pages/Result";
import NotFound from "@/pages/NotFound";


const Dashboard = lazy(() => import("@/pages/Dashboard"));
const InterviewApp = lazy(() => import("@/pages/InterviewApp"));
const InterviewHistory = lazy(() => import("@/pages/InterviewHistory"));
const MockTests = lazy(() => import("@/pages/MockTests"));
const Profile = lazy(() => import("@/pages/Profile"));
const MockTestRunner = lazy(() => import("@/pages/MockTestRunner"));
const AdminRequests = lazy(() => import("@/pages/AdminRequests"));
const AdminUsers = lazy(() => import("@/pages/AdminUsers"));
const AdminAnalytics = lazy(() => import("@/pages/AdminAnalytics"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const StudyMaterials = lazy(() => import("@/pages/StudyMaterials"));
const Chatbot = lazy(() => import("@/pages/Chatbot"));
const queryClient = new QueryClient();



export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
  <AuthProvider>
    <Suspense
  fallback={
    <div className="flex items-center justify-center h-screen text-gray-500">
      Loading Voice2Career...
    </div>
  }
>
      <Routes>
            {/* 🌐 PUBLIC */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 📊 DASHBOARD */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* 🎤 INTERVIEW */}
            <Route
              path="/interview"
              element={
                <ProtectedRoute>
                  <InterviewApp />
                </ProtectedRoute>
              }
            />
<Route path="/privacy" element={<Privacy />} />
<Route path="/terms" element={<Terms />} />
            <Route
              path="/interview-completed"
              element={
                <ProtectedRoute>
                  <InterviewCompleted />
                </ProtectedRoute>
              }
            />
<Route path="/verify-email" element={<VerifyEmail />} />

            {/* 📚 STUDY MATERIALS (FINAL SINGLE SOURCE) */}
            <Route
              path="/study-materials"
              element={
                <ProtectedRoute>
                  <StudyMaterials />
                </ProtectedRoute>
              }
            />
            <Route
  path="/study-materials/:folderId"
  element={
    <ProtectedRoute>
      <StudyFolder />
    </ProtectedRoute>
  }
/>



            {/* 📄 PDF / READER */}
            <Route
              path="/study/read"
              element={
                <ProtectedRoute>
                  <StudyReader />
                </ProtectedRoute>
              }
            />
            <Route
  path="/study-materials/:folderId/:topicId"
  element={
    <ProtectedRoute>
      <StudyTopic />
    </ProtectedRoute>
  }
/>

<Route path="/reset-password" element={<ResetPassword />} />
<Route path="/about" element={<About />} />

            {/* 📜 HISTORY */}
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <InterviewHistory />
                </ProtectedRoute>
              }
            />
            <Route
  path="/mock-tests"
  element={
    <ProtectedRoute>
      <MockTests />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route
  index
  element={<AdminDashboard />}
/>
  <Route
    path="requests"
    element={<AdminRequests />}
  />
  <Route
    path="users"
    element={<AdminUsers />}
  />
  <Route
    path="analytics"
    element={<AdminAnalytics />}
  />
</Route>
<Route path="/" element={<LandingPage />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route
  path="/app"
  element={
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  }
/>

<Route
  path="/mock-tests/:id"
  element={
    <ProtectedRoute>
      <MockTestRunner />
    </ProtectedRoute>
  }
/>

<Route
  path="/mock-tests/:id/start"
  element={
    <ProtectedRoute>
      <MockTestRunner />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/assistant"
  element={
    <ProtectedRoute>
      <Chatbot />
    </ProtectedRoute>
  }
/>

<Route
  path="/marksheet/:testId"
  element={
    <ProtectedRoute>
      <Marksheet />
    </ProtectedRoute>
  }
/>



            <Route
              path="/history/:id"
              element={
                <ProtectedRoute>
                  <InterviewDetails />
                </ProtectedRoute>
              }
            />



            {/* 📈 RESULT */}
            <Route
              path="/result"
              element={
                <ProtectedRoute>
                  <Result />
                </ProtectedRoute>
              }
            />


            {/* ❌ FALLBACK */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
