import Admin from '../models/Admin.js'
import generateToken from '../utils/generateToken.js'

/* =========================
   COOKIE CONFIGURATION
========================= */
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
})

/* =========================
   LOGIN ADMIN
========================= */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. Check if email and password were provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      })
    }

    // 2. Fetch admin including hidden password field
    const admin = await Admin.findOne({ email }).select('+password')

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // 3. Verify password match
    const passwordMatches = await admin.comparePassword(password)

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // 4. Generate JWT
    const token = generateToken(admin._id)

    // 5. Set Cookie with 24h expiration
    res.cookie('adminToken', token, {
      ...getCookieOptions(),
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })

    return res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({
      success: false,
      message: 'Login failed',
    })
  }
}

/* =========================
   LOGOUT ADMIN
========================= */
export const logoutAdmin = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  })
}

/* =========================
   GET CURRENT ADMIN
========================= */
export const getCurrentAdmin = (req, res) => {
  return res.status(200).json({
    success: true,
    admin: req.admin,
  })
}