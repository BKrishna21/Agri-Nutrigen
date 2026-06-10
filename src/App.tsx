

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Planner from './pages/Planner';
import Login from './pages/Login';
import MyPlans from './pages/MyPlans';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './lib/AuthContext';

// 🔥 NEW: Wrapper to prevent early route evaluation
function AppRoutes() {
  const { loading } = useAuth();

  // ⛔ IMPORTANT: prevents redirect loops on refresh
  if (loading) return null;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/planner"
        element={
          <ProtectedRoute>
            <Planner />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-plans"
        element={
          <ProtectedRoute>
            <MyPlans />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen font-sans text-gray-900 bg-[#fdfdfb]">
          <Navbar />

          <main>
            <AppRoutes />
          </main>

          <footer className="bg-white border-t border-green-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <span className="text-xl font-bold text-green-900">AgriNutrigen</span>
                  <p className="text-sm text-gray-500 mt-1">Community Nutrition Planner</p>
                </div>

                <div className="flex space-x-6">
                  <a href="#" className="text-sm text-gray-500 hover:text-green-600">Privacy Policy</a>
                  <a href="#" className="text-sm text-gray-500 hover:text-green-600">Terms of Service</a>
                  <a href="#" className="text-sm text-gray-500 hover:text-green-600">Contact Us</a>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                <p className="text-xs text-gray-400">
                  © 2026 AgriNutrigen Project. All rights reserved.
                </p>
              </div>
            </div>
          </footer>

        </div>
      </Router>
    </AuthProvider>
  );
}