'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Projects() {
  const { user } = useAuth();
  const router = useRouter();

  // Sample projects data - replace with actual data from your backend
  const projects = [
    {
      id: 1,
      title: 'AI Chatbot Development',
      description: 'Building an intelligent chatbot using Python and TensorFlow',
      skills: ['Python', 'TensorFlow', 'NLP'],
      members: 3,
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      skills: ['React', 'Node.js', 'MongoDB'],
      members: 4,
      status: 'Planning'
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile app using Flutter',
      skills: ['Flutter', 'Dart', 'Firebase'],
      members: 2,
      status: 'Recruiting'
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Projects</h1>
            <p className="mt-2 text-gray-400">Find or create collaborative projects</p>
          </div>
          {user && (
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => router.push('/projects/new')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm bg-indigo-500/20 text-indigo-300 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>{project.members} members</span>
                <span className="px-2 py-1 bg-gray-700/50 rounded-full">
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {!user && (
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Sign in to create and join projects</p>
            <div className="flex gap-4 justify-center">
              <Button
                asChild
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                <Link href="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 