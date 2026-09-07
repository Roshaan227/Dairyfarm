import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LockKeyhole, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import api from '../../services/api'

const AdminLogin = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Redirect if admin session already exists in localStorage
  useEffect(() => {
    const existingAdmin = localStorage.getItem('admin')
    if (existingAdmin) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      const response = await api.post('/auth/login', formData)

      // Log response for easy debugging in F12 Developer Console
      console.log('Login API response:', response.data)

      if (response.data.success) {
        // Save user payload for local UI state & route guards
        localStorage.setItem('admin', JSON.stringify(response.data.admin))
        localStorage.setItem('adminToken', 'true') // Sets fallback token flag if referenced anywhere else

        // Navigate to the Dashboard
        navigate('/admin/dashboard', { replace: true })
      } else {
        setErrorMsg(response.data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Detailed Login Error Context:', error)

      // Diagnostic Error Parsing for precise troubleshooting
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        const status = error.response.status
        const serverMsg = error.response.data?.message || 'Server error occurred.'

        if (status === 401 || status === 403) {
          setErrorMsg(`[Auth Error ${status}]: ${serverMsg}`)
        } else if (status === 404) {
          setErrorMsg(`[Route Error 404]: /auth/login endpoint not found on backend.`)
        } else if (status >= 500) {
          setErrorMsg(`[Server Error ${status}]: ${serverMsg || 'Vercel serverless function crashed.'}`)
        } else {
          setErrorMsg(`[Error ${status}]: ${serverMsg}`)
        }
      } else if (error.request) {
        // Request made but no response received (CORS block, Vercel edge redirect, or server down)
        setErrorMsg('[Network/CORS Error]: Preflight failed or backend unreachable. Check Vercel logs and CORS whitelist.')
      } else {
        setErrorMsg(error.message || 'Login failed. Please check your credentials.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-farm-green-dark px-6">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-gold-light"
        >
          <ArrowLeft size={16} />
          Back to website
        </Link>

        <div className="bg-white p-8 shadow-2xl sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-gold">
              <LockKeyhole size={23} className="text-gold-dark" />
            </div>

            <h1 className="mt-5 font-display text-3xl text-farm-green">
              Admin Portal
            </h1>

            <p className="mt-2 text-sm text-muted">
              Bismillah Dairy Farm Management
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 border border-red-200 bg-red-50 p-3 text-center text-xs font-medium text-red-600 leading-relaxed whitespace-pre-line">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-cream-dark bg-cream px-4 py-3 outline-none transition focus:border-gold"
                placeholder="admin@bismillahdairyfarm.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-cream-dark bg-cream px-4 py-3 pr-12 outline-none transition focus:border-gold"
                  placeholder="Enter password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-farm-green py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-farm-green-light disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default AdminLogin