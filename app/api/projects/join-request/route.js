import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import { verifyToken } from '@/lib/auth';
import { sendCollaborationEmail } from '@/lib/email';

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

    const { projectId, message, skills, availability } = await req.json();

    // Get project details
    const project = await Project.findById(projectId).populate('owner', 'name email');
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Send email notification
    try {
      await sendCollaborationEmail({
        toEmail: project.owner.email,
        toName: project.owner.name,
        fromName: decoded.name,
        fromEmail: decoded.email,
        message,
        type: 'project',
        projectTitle: project.title,
        skills,
        availability,
        actionLink: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/requests`
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Continue with the request even if email fails
    }

    return NextResponse.json({ message: 'Join request sent successfully' });
  } catch (error) {
    console.error('Error processing join request:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process join request' },
      { status: 500 }
    );
  }
} 