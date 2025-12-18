import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AppProvider, useApp } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import UploadDocumentsPage from './pages/UploadDocumentsPage';
import VerifiedDocumentsPage from './pages/VerifiedDocumentsPage';
import UnderReviewPage from './pages/UnderReviewPage';
import RejectedDocumentsPage from './pages/RejectedDocumentsPage';
import VerificationPage from './pages/VerificationPage';
import ProfilePage from './pages/ProfilePage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-contacts"
          element={
            <ProtectedRoute>
              <VerificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/upload"
          element={
            <ProtectedRoute>
              <UploadDocumentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/verified"
          element={
            <ProtectedRoute>
              <VerifiedDocumentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/under-review"
          element={
            <ProtectedRoute>
              <UnderReviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/rejected"
          element={
            <ProtectedRoute>
              <RejectedDocumentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
