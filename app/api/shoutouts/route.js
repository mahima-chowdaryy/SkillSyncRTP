import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Shoutout from '@/models/Shoutout';
import { verifyToken } from '@/lib/auth';

export async function POST(req) {
  try {
    await connectDB();
    
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded.id) {
      return NextResponse.json({ error: 'Invalid user ID in token' }, { status: 401 });
    }

    const { title, description, requiredSkills, urgency, projectType, deadline, contactPreference } = await req.json();

    const shoutout = await Shoutout.create({
      title,
      description,
      requiredSkills,
      urgency,
      projectType,
      deadline,
      contactPreference,
      userId: decoded.id,
      status: 'active'
    });

    return NextResponse.json(shoutout, { status: 201 });
  } catch (error) {
    console.error('Error creating shoutout:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create shoutout' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded.id) {
      return NextResponse.json({ error: 'Invalid user ID in token' }, { status: 401 });
    }
    
    const shoutouts = await Shoutout.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(shoutouts);
  } catch (error) {
    console.error('Error fetching shoutouts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch shoutouts' },
      { status: 500 }
    );
  }
} 