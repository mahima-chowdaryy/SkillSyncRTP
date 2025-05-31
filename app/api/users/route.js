import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
const verifyToken = (req) => {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// GET all users (with pagination)
export async function GET(req) {
  try {
    console.log('Starting GET /api/users request');
    
    // Check MongoDB URI
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not defined');
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';

    console.log('Request parameters:', { page, limit, search });

    try {
      console.log('Attempting database connection...');
      await connectDB();
      console.log('Database connection successful');
    } catch (dbError) {
      console.error('Database connection failed:', {
        name: dbError.name,
        message: dbError.message,
        stack: dbError.stack
      });
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    const query = {
      ...(search && {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { skills: { $regex: search, $options: 'i' } },
        ],
      }),
    };

    console.log('Executing query:', JSON.stringify(query, null, 2));

    try {
      const users = await User.find(query)
        .select('-password')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await User.countDocuments(query);
      console.log(`Query successful: Found ${users.length} users out of ${total} total`);

      return NextResponse.json({
        users,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (queryError) {
      console.error('Database query failed:', {
        name: queryError.name,
        message: queryError.message,
        stack: queryError.stack
      });
      return NextResponse.json(
        { error: 'Error executing database query' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error in GET /api/users:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 