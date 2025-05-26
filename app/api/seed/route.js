import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

const sampleUsers = [
  {
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
    bio: "Computer Science student passionate about AI and machine learning",
    skills: ["Python", "Machine Learning", "Data Analysis", "TensorFlow"],
    education: [
      {
        school: "Stanford University",
        degree: "B.S. Computer Science",
        startYear: 2020,
        endYear: 2024
      }
    ]
  },
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    password: "password123",
    bio: "Full-stack developer with a focus on web technologies",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "AWS"],
    education: [
      {
        school: "MIT",
        degree: "B.S. Computer Science",
        startYear: 2019,
        endYear: 2023
      }
    ]
  },
  {
    name: "Michael Chen",
    email: "michael@example.com",
    password: "password123",
    bio: "Mobile app developer and UI/UX enthusiast",
    skills: ["Swift", "React Native", "UI/UX Design", "Firebase"],
    education: [
      {
        school: "UC Berkeley",
        degree: "B.S. Computer Science",
        startYear: 2021,
        endYear: 2025
      }
    ]
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    password: "password123",
    bio: "Data scientist and research enthusiast",
    skills: ["R", "Python", "SQL", "Data Visualization", "Statistics"],
    education: [
      {
        school: "Harvard University",
        degree: "B.S. Data Science",
        startYear: 2020,
        endYear: 2024
      }
    ]
  },
  {
    name: "Alex Rodriguez",
    email: "alex@example.com",
    password: "password123",
    bio: "Cybersecurity specialist and ethical hacker",
    skills: ["Network Security", "Penetration Testing", "Linux", "Python"],
    education: [
      {
        school: "Georgia Tech",
        degree: "B.S. Cybersecurity",
        startYear: 2019,
        endYear: 2023
      }
    ]
  },
  {
    name: "Sophie Kim",
    email: "sophie@example.com",
    password: "password123",
    bio: "Game developer and 3D artist",
    skills: ["Unity", "C#", "3D Modeling", "Game Design"],
    education: [
      {
        school: "USC",
        degree: "B.S. Game Development",
        startYear: 2021,
        endYear: 2025
      }
    ]
  },
  {
    name: "David Wilson",
    email: "david@example.com",
    password: "password123",
    bio: "Cloud architect and DevOps engineer",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    education: [
      {
        school: "University of Washington",
        degree: "B.S. Computer Engineering",
        startYear: 2018,
        endYear: 2022
      }
    ]
  },
  {
    name: "Olivia Martinez",
    email: "olivia@example.com",
    password: "password123",
    bio: "Blockchain developer and crypto enthusiast",
    skills: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts"],
    education: [
      {
        school: "NYU",
        degree: "B.S. Computer Science",
        startYear: 2020,
        endYear: 2024
      }
    ]
  },
  {
    name: "James Thompson",
    email: "james@example.com",
    password: "password123",
    bio: "AI researcher and deep learning specialist",
    skills: ["PyTorch", "Computer Vision", "NLP", "Deep Learning"],
    education: [
      {
        school: "Carnegie Mellon",
        degree: "B.S. Artificial Intelligence",
        startYear: 2019,
        endYear: 2023
      }
    ]
  },
  {
    name: "Emma Brown",
    email: "emma@example.com",
    password: "password123",
    bio: "Frontend developer and accessibility advocate",
    skills: ["React", "TypeScript", "CSS", "Accessibility", "UI Testing"],
    education: [
      {
        school: "University of Michigan",
        degree: "B.S. Computer Science",
        startYear: 2021,
        endYear: 2025
      }
    ]
  },
  {
    name: "Daniel Lee",
    email: "daniel@example.com",
    password: "password123",
    bio: "Backend developer and database specialist",
    skills: ["Java", "Spring Boot", "PostgreSQL", "Microservices"],
    education: [
      {
        school: "University of Texas",
        degree: "B.S. Software Engineering",
        startYear: 2020,
        endYear: 2024
      }
    ]
  },
  {
    name: "Isabella Garcia",
    email: "isabella@example.com",
    password: "password123",
    bio: "UX researcher and product designer",
    skills: ["User Research", "Figma", "Prototyping", "User Testing"],
    education: [
      {
        school: "University of California",
        degree: "B.S. Human-Computer Interaction",
        startYear: 2019,
        endYear: 2023
      }
    ]
  },
  {
    name: "William Taylor",
    email: "william@example.com",
    password: "password123",
    bio: "Robotics engineer and hardware enthusiast",
    skills: ["C++", "ROS", "Arduino", "Computer Vision"],
    education: [
      {
        school: "MIT",
        degree: "B.S. Robotics Engineering",
        startYear: 2021,
        endYear: 2025
      }
    ]
  },
  {
    name: "Ava Anderson",
    email: "ava@example.com",
    password: "password123",
    bio: "Mobile developer and AR/VR specialist",
    skills: ["Unity", "C#", "AR/VR Development", "3D Graphics"],
    education: [
      {
        school: "Stanford University",
        degree: "B.S. Computer Science",
        startYear: 2020,
        endYear: 2024
      }
    ]
  },
  {
    name: "Noah White",
    email: "noah@example.com",
    password: "password123",
    bio: "Full-stack developer and open source contributor",
    skills: ["JavaScript", "React", "Node.js", "GraphQL", "Docker"],
    education: [
      {
        school: "University of Illinois",
        degree: "B.S. Computer Science",
        startYear: 2019,
        endYear: 2023
      }
    ]
  }
];

export async function POST() {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );

    await User.insertMany(hashedUsers);

    return NextResponse.json({ message: 'Sample data seeded successfully' });
  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json(
      { error: 'Failed to seed data' },
      { status: 500 }
    );
  }
} 