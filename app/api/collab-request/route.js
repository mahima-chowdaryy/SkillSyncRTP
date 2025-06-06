import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendCollaborationEmail } from '@/lib/email';

export async function POST(request) {
  try {
    console.log('Received collaboration request');
    await connectDB();
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { toUser, fromUser, message, type = 'project', projectTitle, skills, availability } = body;
    
    if (!toUser || !fromUser || !message) {
      console.error('Missing required fields:', { toUser, fromUser, message });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get user details
    const fromUserDetails = await User.findOne({ email: fromUser });
    const toUserDetails = await User.findOne({ email: toUser });

    if (!fromUserDetails) {
      console.error('Sender not found:', fromUser);
      return NextResponse.json(
        { error: 'Sender not found' },
        { status: 404 }
      );
    }

    if (!toUserDetails) {
      console.error('Recipient not found:', toUser);
      return NextResponse.json(
        { error: 'Recipient not found' },
        { status: 404 }
      );
    }

    // Check if request already exists
    const existingRequestIndex = toUserDetails.collabRequests.findIndex(
      request => request.from.toString() === fromUserDetails._id.toString() && 
                request.status === 'pending'
    );

    if (existingRequestIndex !== -1) {
      console.log('Updating existing request');
      // Update the existing request
      toUserDetails.collabRequests[existingRequestIndex] = {
        from: fromUserDetails._id,
        to: toUserDetails._id,
        message,
        status: 'pending',
        updatedAt: new Date(),
        createdAt: toUserDetails.collabRequests[existingRequestIndex].createdAt
      };
    } else {
      console.log('Creating new request');
      // Add new collaboration request
      toUserDetails.collabRequests.push({
        from: fromUserDetails._id,
        to: toUserDetails._id,
        message,
        status: 'pending',
        createdAt: new Date()
      });
    }

    await toUserDetails.save();
    console.log('Saved collaboration request to database');

    // Send email using EmailJS
    try {
      const emailData = {
        toEmail: toUser,
        toName: toUserDetails.name,
        fromName: fromUserDetails.name,
        fromEmail: fromUser,
        subject: existingRequestIndex !== -1 ? 'Updated Collaboration Request' : 'New Collaboration Request',
        message,
        type,
        projectTitle,
        skills,
        availability,
        actionLink: `http://localhost:3001/dashboard/profile/${fromUserDetails._id}`
      };
      
      console.log('Preparing to send email with data:', emailData);
      const emailResult = await sendCollaborationEmail(emailData);
      console.log('Email sent successfully:', emailResult);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      message: existingRequestIndex !== -1 ? 'Collaboration request updated successfully' : 'Collaboration request sent successfully',
    });
  } catch (error) {
    console.error('Error in collaboration request:', error);
    return NextResponse.json(
      { error: 'Failed to send collaboration request' },
      { status: 500 }
    );
  }
} 