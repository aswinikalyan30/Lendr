import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import StudentHome from './student/Home'
import StaffHome from './staff/Home'
import AdminHome from './admin/Home'
import App from './App'

// Router component centralizes all routes. Landing/default route redirects to /login.
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/student" element={<App><StudentHome /></App>} />
      <Route path="/staff" element={<App><StaffHome /></App>} />
      <Route path="/admin" element={<App><AdminHome /></App>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

// Helper example: you cannot export a hook directly, but components can use useNavigate.
// Use useNavigate inside your components, e.g.:
// const navigate = useNavigate(); navigate('/student')
