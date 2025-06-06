import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req, { params }) {
  try {
    console.log('API: Fetching user with ID:', params.id);
    await connectDB();
    const user = await User.findById(params.id).select('-password');
    console.log('API: Found user:', user);
    
    if (!user) {
      console.log('API: User not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Error fetching user' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    console.log('API: Updating user with ID:', params.id);
    await connectDB();
    const updates = await req.json();
    console.log('API: Update data:', updates);
    
    // Remove password from updates if present
    delete updates.password;
    
    const user = await User.findByIdAndUpdate(
      params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    console.log('API: Updated user:', user);

    if (!user) {
      console.log('API: User not found for update');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Error updating user' },
      { status: 500 }
    );
  }
} 