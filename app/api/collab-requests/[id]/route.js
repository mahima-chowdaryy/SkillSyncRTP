import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const userId = params.id;

    // Get user's received requests
    const receivedRequests = await User.find({
      'collabRequests.to': userId,
      'collabRequests.status': 'pending'
    }).select('name email collabRequests');

    // Get user's sent requests
    const sentRequests = await User.find({
      'collabRequests.from': userId
    }).select('name email collabRequests');

    // Format received requests
    const formattedReceived = receivedRequests.flatMap(user => 
      user.collabRequests
        .filter(req => req.to.toString() === userId && req.status === 'pending')
        .map(req => ({
          _id: req._id,
          fromId: user._id,
          fromName: user.name,
          fromEmail: user.email,
          message: req.message,
          status: req.status
        }))
    );

    // Format sent requests
    const formattedSent = sentRequests.flatMap(user => 
      user.collabRequests
        .filter(req => req.from.toString() === userId)
        .map(req => ({
          _id: req._id,
          toId: user._id,
          toName: user.name,
          toEmail: user.email,
          message: req.message,
          status: req.status
        }))
    );

    return NextResponse.json({
      received: formattedReceived,
      sent: formattedSent
    });
  } catch (error) {
    console.error('Error fetching collaboration requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collaboration requests' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { requestId, status } = await request.json();
    const userId = params.id;

    // Find the user who sent the request
    const user = await User.findOne({
      'collabRequests._id': requestId
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    // Update the request status
    const request = user.collabRequests.id(requestId);
    if (!request) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    request.status = status;
    await user.save();

    return NextResponse.json({ message: 'Request updated successfully' });
  } catch (error) {
    console.error('Error updating collaboration request:', error);
    return NextResponse.json(
      { error: 'Failed to update collaboration request' },
      { status: 500 }
    );
  }
} 