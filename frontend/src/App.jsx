import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import About from './pages/About'
import Products from './pages/Products'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import { Toaster } from 'react-hot-toast'

import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import Animals from './pages/admin/Animals.jsx'
import MilkProduction from './pages/admin/MilkProduction.jsx'
import AdminProducts from './pages/admin/AdminProducts.jsx'
import AdminSettings from './pages/admin/AdminSettings.jsx'

/* Updated Protection Check */
const ProtectedAdminRoute = ({ children }) => {
  // Check for 'admin' stored during login
  const isAuthenticated = localStorage.getItem('admin')

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

const App = () => {
  return (
    <>
      {/* Move Toaster outside of <Routes> */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        {/* ================= ADMIN AUTH ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/animals"
          element={
            <ProtectedAdminRoute>
              <Animals />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/milk-production"
          element={
            <ProtectedAdminRoute>
              <MilkProduction />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <AdminProducts />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <AdminSettings />
            </ProtectedAdminRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App