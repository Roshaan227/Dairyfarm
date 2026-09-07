import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const protect = async (req, res, next) => {

  try {

    const token = req.cookies.adminToken

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    const admin = await Admin
      .findById(decoded.id)
      .select('-password')

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account not found',
      })
    }

    req.admin = admin

    next()

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication',
    })
  }
}

export default protect