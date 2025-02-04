import mongoose from "mongoose";


const MONGODB_URI = String(process.env.MONGO_DB_CONNECTION_STRING)

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

declare global {
  var mongoose: { conn: any; promise: any } | undefined
}

let cached = global.mongoose || { conn: null, promise: null }

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering
    }

    cached.promise =await mongoose.connect(MONGODB_URI, opts)
  }
  
  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (e) {
    cached.promise = null
    throw e
  }
}

export default dbConnect