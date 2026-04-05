import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import WorkshopTypes from './pages/WorkshopTypes';
import WorkshopTypeDetail from './pages/WorkshopTypeDetail';
import ProposeWorkshop from './pages/ProposeWorkshop';
import WorkshopDetail from './pages/WorkshopDetail';
import Profile from './pages/Profile';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-layout">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workshops" element={<WorkshopTypes />} />
            <Route path="/workshops/:id" element={<WorkshopTypeDetail />} />

            {/* Protected Routes (Require Login) */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/propose" 
              element={
                <ProtectedRoute>
                  <ProposeWorkshop />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/workshop/:id" 
              element={
                <ProtectedRoute>
                  <WorkshopDetail />
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

            {/* Fallback routing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
