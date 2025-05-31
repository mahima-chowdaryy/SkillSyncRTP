import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Log the connection string (without password) for debugging
const sanitizedUri = MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@');
console.log('MongoDB URI format check:', {
  hasUri: !!MONGODB_URI,
  uriLength: MONGODB_URI.length,
  sanitizedUri,
  isAtlas: MONGODB_URI.includes('mongodb+srv://')
});

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4
      maxPoolSize: 10,
      minPoolSize: 5,
    };

    console.log('Attempting MongoDB connection with options:', opts);
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', {
          name: error.name,
          message: error.message,
          code: error.code,
          codeName: error.codeName,
          stack: error.stack
        });
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Failed to establish MongoDB connection:', {
      name: e.name,
      message: e.message,
      code: e.code,
      codeName: e.codeName,
      stack: e.stack
    });
    throw e;
  }

  return cached.conn;
}

export default connectDB; 