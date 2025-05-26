'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Book, Code, Video, FileText } from 'lucide-react';

export default function Resources() {
  const { user } = useAuth();

  const resources = [
    {
      category: 'Tutorials',
      icon: <Book className="w-6 h-6 text-indigo-400" />,
      items: [
        {
          title: 'Getting Started with Web Development',
          description: 'Learn the basics of HTML, CSS, and JavaScript',
          link: '#'
        },
        {
          title: 'Introduction to React',
          description: 'Build your first React application',
          link: '#'
        },
        {
          title: 'Python for Beginners',
          description: 'Start your programming journey with Python',
          link: '#'
        }
      ]
    },
    {
      category: 'Code Examples',
      icon: <Code className="w-6 h-6 text-indigo-400" />,
      items: [
        {
          title: 'React Components Library',
          description: 'Reusable components for your projects',
          link: '#'
        },
        {
          title: 'API Integration Examples',
          description: 'Learn how to integrate various APIs',
          link: '#'
        },
        {
          title: 'Database Queries',
          description: 'Common database operations and patterns',
          link: '#'
        }
      ]
    },
    {
      category: 'Video Courses',
      icon: <Video className="w-6 h-6 text-indigo-400" />,
      items: [
        {
          title: 'Full Stack Development',
          description: 'Complete course on building web applications',
          link: '#'
        },
        {
          title: 'Mobile App Development',
          description: 'Create cross-platform mobile apps',
          link: '#'
        },
        {
          title: 'Cloud Computing',
          description: 'Learn about AWS, Azure, and GCP',
          link: '#'
        }
      ]
    },
    {
      category: 'Documentation',
      icon: <FileText className="w-6 h-6 text-indigo-400" />,
      items: [
        {
          title: 'API Documentation',
          description: 'Detailed API reference and guides',
          link: '#'
        },
        {
          title: 'Best Practices',
          description: 'Coding standards and guidelines',
          link: '#'
        },
        {
          title: 'Security Guidelines',
          description: 'Keep your applications secure',
          link: '#'
        }
      ]
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white">Learning Resources</h1>
          <p className="mt-2 text-gray-400">Explore tutorials, code examples, and documentation</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {resources.map((section, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center gap-3 mb-6">
                {section.icon}
                <h2 className="text-xl font-semibold text-white">{section.category}</h2>
              </div>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 mb-3">{item.description}</p>
                    <Button
                      asChild
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-gray-700"
                    >
                      <Link href={item.link}>View Resource</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!user && (
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Sign in to access premium resources</p>
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