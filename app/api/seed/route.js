import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Project from '@/models/Project';
import bcrypt from 'bcryptjs';
import { students } from '@/lib/sampleData';

export async function GET() {
  return POST();
}

export async function POST() {
  try {
    console.log('Starting database seeding...');
    await connectDB();
    console.log('Connected to database successfully');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Project.deleteMany({});
    console.log('Existing data cleared');

    // Filter out your email from students array to avoid duplicates
    const filteredStudents = students.filter(student => student.email !== "23r21a6759@mlrit.ac.in");

    // Prepare users with hashed passwords
    console.log('Hashing passwords for', filteredStudents.length + 1, 'users...');
    const hashedUsers = await Promise.all([
      // Add your user first
      {
        name: "Tatineni Mahima",
        email: "23r21a6759@mlrit.ac.in",
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        skills: ["JavaScript", "React", "Node.js", "MongoDB", "Docker"],
        bio: "Tatineni Mahima is a student at MLRIT studying CSD.",
        education: [
          {
            school: "MLRIT",
            degree: "B.Tech CSD",
            startYear: 2023,
            endYear: 2027
          }
        ]
      },
      // Then add all other students
      ...filteredStudents.map(async (student) => ({
        name: student.name,
        email: student.email,
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        skills: student.skills,
        bio: `${student.name} is a student at ${student.college} studying ${student.department}.`,
        education: [
          {
            school: student.college,
            degree: `B.Tech ${student.department}`,
            startYear: 2023,
            endYear: 2027
          }
        ]
      }))
    ]);
    console.log('Passwords hashed successfully');

    // Insert new users
    console.log('Inserting users into database...');
    const result = await User.insertMany(hashedUsers, { ordered: true });
    console.log('Successfully inserted', result.length, 'users');

    // Create projects
    console.log('Creating projects...');
    const projects = [
      {
        title: 'AI-Powered Study Assistant',
        description: 'An intelligent study assistant that helps students learn better using machine learning and natural language processing. Features include personalized learning paths, automated quiz generation, and real-time doubt resolution.',
        skills: ['Python', 'Machine Learning', 'NLP', 'React', 'MongoDB'],
        status: 'In Progress',
        lead: result[0]._id, // Tatineni Mahima
        members: [
          result[0]._id,
          result[5]._id,
          result[10]._id,
          result[15]._id,
          result[20]._id
        ],
        joinRequests: []
      },
      {
        title: 'Smart Campus Navigation',
        description: 'A mobile app for navigating college campuses with real-time updates and location-based services. Includes features like class schedule integration, room finder, and emergency alerts.',
        skills: ['React Native', 'Node.js', 'MongoDB', 'Google Maps API'],
        status: 'Planning',
        lead: result[0]._id,
        members: [
          result[0]._id,
          result[7]._id,
          result[12]._id,
          result[17]._id,
          result[22]._id
        ],
        joinRequests: []
      },
      {
        title: 'Virtual Study Groups',
        description: 'A platform for students to create and join virtual study groups with real-time collaboration features. Includes video conferencing, shared whiteboard, and document collaboration.',
        skills: ['React', 'Node.js', 'WebRTC', 'MongoDB', 'Socket.io'],
        status: 'Recruiting',
        lead: result[0]._id,
        members: [
          result[0]._id,
          result[8]._id,
          result[13]._id,
          result[18]._id,
          result[23]._id
        ],
        joinRequests: []
      },
      {
        title: 'Student Resource Hub',
        description: 'A centralized platform for sharing and accessing academic resources, notes, and study materials. Features include resource categorization, search functionality, and user ratings.',
        skills: ['Django', 'React', 'PostgreSQL', 'AWS S3'],
        status: 'Planning',
        lead: result[0]._id,
        members: [
          result[0]._id,
          result[9]._id,
          result[14]._id,
          result[19]._id,
          result[24]._id
        ],
        joinRequests: []
      },
      {
        title: 'Smart Attendance System',
        description: 'An automated attendance system using facial recognition and QR codes. Includes features like real-time attendance tracking, automated reports, and integration with existing college systems.',
        skills: ['Python', 'OpenCV', 'React', 'Node.js', 'MongoDB'],
        status: 'In Progress',
        lead: result[0]._id,
        members: [
          result[0]._id,
          result[11]._id,
          result[16]._id,
          result[21]._id,
          result[26]._id
        ],
        joinRequests: []
      },
      {
        title: 'College Event Management',
        description: 'A comprehensive platform for managing college events, workshops, and competitions. Features include event registration, automated notifications, and feedback collection.',
        skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
        status: 'Recruiting',
        lead: result[0]._id,
        members: [
          result[0]._id,
          result[6]._id,
          result[25]._id,
          result[27]._id,
          result[28]._id
        ],
        joinRequests: []
      }
    ];

    // Insert new projects
    const projectResult = await Project.insertMany(projects);
    console.log('Successfully inserted', projectResult.length, 'projects');

    // Verify the final counts
    const finalUserCount = await User.countDocuments();
    const finalProjectCount = await Project.countDocuments();

    return NextResponse.json({ 
      message: 'Sample data added successfully',
      usersAdded: result.length,
      totalUsers: finalUserCount,
      projectsAdded: projectResult.length,
      totalProjects: finalProjectCount
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
} 