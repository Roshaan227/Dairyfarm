import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    // Checks for either MONGO_URI or MONGODB_URI in your .env
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI

    if (!uri) {
      throw new Error('MONGO_URI is missing from your .env file')
    }

    const connection = await mongoose.connect(uri)

    console.log(
      `MongoDB Connected: ${connection.connection.host}`
    )
  } catch (error) {
    console.error(
      `MongoDB Connection Error: ${error.message}`
    )

    process.exit(1)
  }
}

export default connectDB