import 'dotenv/config'
import dns from 'node:dns'

// Force Node.js to use Google/Cloudflare public DNS
dns.setDefaultResultOrder('ipv4first')
dns.setServers(['8.8.8.8', '1.1.1.1'])

import mongoose from 'mongoose'
import connectDB from './config/db.js'
import Admin from './models/Admin.js'

const createAdmin = async () => {
  try {
    await connectDB()

    const existingAdmin = await Admin.findOne({
      email: '00@gmail.com',
    })

    if (existingAdmin) {
      console.log('Admin already exists.')
      process.exit(0)
    }

    const admin = await Admin.create({
      name: 'Roshaan Haider',
      email: '00@gmail.com',
      password: '90909090',
    })

    console.log(`Admin created successfully: ${admin.email}`)
    process.exit(0)
  } catch (error) {
    console.error('Error creating admin:', error.message)
    process.exit(1)
  }
}

createAdmin()