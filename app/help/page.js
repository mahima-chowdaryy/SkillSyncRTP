'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HelpCircle, Mail, MessageSquare, BookOpen } from 'lucide-react';

export default function Help() {
  const { user } = useAuth();

  const faqs = [
    {
      question: 'How do I create a project?',
      answer: 'To create a project, sign in to your account and click the "Create Project" button on the Projects page. Fill in the project details, required skills, and description to get started.'
    },
    {
      question: 'How can I find collaborators?',
      answer: 'Use the "Find Students" feature to search for users based on their skills, education, or project interests. You can also browse through the Projects page to find ongoing projects that match your skills.'
    },
    {
      question: 'How do I update my profile?',
      answer: 'Go to your Profile page and click the "Edit Profile" button. You can update your skills, education, bio, and other information to make your profile more attractive to potential collaborators.'
    },
    {
      question: 'What are skill shoutouts?',
      answer: 'Skill shoutouts are a way to showcase your expertise in specific areas. They help other users find you when they need someone with your particular skills for their projects.'
    }
  ];

  const supportOptions = [
    {
      title: 'Documentation',
      description: 'Browse our comprehensive guides and tutorials',
      icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
      link: '/resources'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users and get help',
      icon: <MessageSquare className="w-6 h-6 text-indigo-400" />,
      link: '#'
    },
    {
      title: 'Contact Support',
      description: 'Get in touch with our support team',
      icon: <Mail className="w-6 h-6 text-indigo-400" />,
      link: 'mailto:support@skillsync.com'
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white">Help Center</h1>
          <p className="mt-2 text-gray-400">Find answers to common questions and get support</p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700"
            >
              Search
            </Button>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
              >
                <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Support Options</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {supportOptions.map((option, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  {option.icon}
                  <h3 className="text-lg font-medium text-white">{option.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{option.description}</p>
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  <Link href={option.link}>Learn More</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-semibold text-white">Still Need Help?</h2>
          </div>
          <p className="text-gray-400 mb-6">
            Our support team is here to help you with any questions or issues you might have.
            We typically respond within 24 hours.
          </p>
          <div className="flex gap-4">
            <Button
              asChild
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Link href="mailto:support@skillsync.com">Contact Support</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-700"
            >
              <Link href="/resources">View Documentation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 