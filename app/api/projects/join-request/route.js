import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import { verifyToken } from '@/lib/auth';
import { sendEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { userId } = await verifyToken(token);
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await request.json();
    const { projectId, name, email, phone, availability, message } = data;

    const project = await Project.findById(projectId)
      .populate('lead', 'name email');

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Add join request to project
    project.joinRequests.push({
      user: userId,
      message: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Availability: ${availability}

Message:
${message}
      `,
      status: 'Pending'
    });

    await project.save();

    // Send email to project lead
    const emailContent = `
Hello ${project.lead.name},

You have received a new join request for your project "${project.title}".

Request Details:
${project.joinRequests[project.joinRequests.length - 1].message}

You can review and respond to this request in your project dashboard.

Best regards,
SkillSync Team
    `;

    await sendEmail({
      to: project.lead.email,
      subject: `New Join Request for ${project.title}`,
      text: emailContent
    });

    return NextResponse.json({ message: 'Join request sent successfully' });
  } catch (error) {
    console.error('Join request error:', error);
    return NextResponse.json(
      { error: 'Failed to process join request' },
      { status: 500 }
    );
  }
} 