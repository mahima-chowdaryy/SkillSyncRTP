'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Book, Code, Video, FileText, ExternalLink, Github, Youtube, Globe } from 'lucide-react';

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
          link: 'https://developer.mozilla.org/en-US/docs/Learn',
          icon: <Globe className="w-4 h-4" />
        },
        {
          title: 'Introduction to React',
          description: 'Build your first React application',
          link: 'https://react.dev/learn',
          icon: <ExternalLink className="w-4 h-4" />
        },
        {
          title: 'Python for Beginners',
          description: 'Start your programming journey with Python',
          link: 'https://www.python.org/about/gettingstarted/',
          icon: <Globe className="w-4 h-4" />
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
          link: 'https://github.com/radix-ui/primitives',
          icon: <Github className="w-4 h-4" />
        },
        {
          title: 'API Integration Examples',
          description: 'Learn how to integrate various APIs',
          link: 'https://github.com/public-apis/public-apis',
          icon: <Github className="w-4 h-4" />
        },
        {
          title: 'Database Queries',
          description: 'Common database operations and patterns',
          link: 'https://github.com/mongodb/mongo-csharp-driver',
          icon: <Github className="w-4 h-4" />
        }
      ]
    },
    {
      category: 'Video Courses',
      icon: <Video className="w-6 h-6 text-indigo-400" />,
      items: [
        {
          title: 'Full Stack Development',
          description: 'Complete course on MERN stack development',
          link: 'https://www.youtube.com/watch?v=7CqJlxBYj-M',
          icon: <Youtube className="w-4 h-4" />
        },
        {
          title: 'Machine Learning Basics',
          description: 'Introduction to ML concepts and implementation',
          link: 'https://www.youtube.com/watch?v=KNAWp2S3w94',
          icon: <Youtube className="w-4 h-4" />
        },
        {
          title: 'DevOps Practices',
          description: 'Learn CI/CD and deployment strategies',
          link: 'https://www.youtube.com/watch?v=0yWAtQ6wYNM',
          icon: <Youtube className="w-4 h-4" />
        }
      ]
    },
    {
      category: 'Documentation',
      icon: <FileText className="w-6 h-6 text-indigo-400" />,
      items: [
        {
          title: 'Next.js Documentation',
          description: 'Official Next.js documentation and guides',
          link: 'https://nextjs.org/docs',
          icon: <ExternalLink className="w-4 h-4" />
        },
        {
          title: 'MongoDB Manual',
          description: 'Complete MongoDB reference and tutorials',
          link: 'https://docs.mongodb.com/manual/',
          icon: <ExternalLink className="w-4 h-4" />
        },
        {
          title: 'TypeScript Handbook',
          description: 'Learn TypeScript from the official handbook',
          link: 'https://www.typescriptlang.org/docs/handbook/intro.html',
          icon: <ExternalLink className="w-4 h-4" />
        }
      ]
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white">Learning Resources</h1>
          <p className="mt-2 text-gray-400">
            Curated resources to help you learn and grow as a developer
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {resources.map((section, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center mb-4">
                {section.icon}
                <h2 className="text-xl font-semibold text-white ml-2">
                  {section.category}
                </h2>
              </div>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-gray-400 hover:text-white transition-colors">
                        {item.icon}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!user && (
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Sign in to access additional resources and track your progress
            </p>
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