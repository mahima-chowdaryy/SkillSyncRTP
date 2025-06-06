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
export async function GET(request) {
  try {
    await connectDB();
    
    // Get search parameters from URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('search') || searchParams.get('query');
    const skills = searchParams.get('skills');
    
    // Build search criteria
    let searchCriteria = {};
    
    if (query) {
      searchCriteria.$or = [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { bio: { $regex: query, $options: 'i' } },
        { 'education.school': { $regex: query, $options: 'i' } },
        { skills: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      searchCriteria.skills = { $in: skillsArray };
    }
    
    // Find users matching criteria
    const users = await User.find(searchCriteria)
      .select('-password') // Exclude password from results
      .sort({ name: 1 }); // Sort by name
    
    console.log('Search criteria:', searchCriteria);
    console.log('Found users:', users.length);
    
    return NextResponse.json({
      users,
      totalPages: Math.ceil(users.length / 10) // Assuming 10 items per page
    });
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json(
      { error: 'Failed to search users' },
      { status: 500 }
    );
  }
} 