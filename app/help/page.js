'use client';

import { useAuth } from '@/context/AuthContext';
import { BookOpen, MessageSquare, Mail, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export default function Help() {
  const { user } = useAuth();

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
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              Search
            </button>
          </div>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {supportOptions.map((option, index) => (
            <Link
              key={index}
              href={option.link}
              className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                {option.icon}
                <h3 className="text-xl font-semibold text-white">{option.title}</h3>
              </div>
              <p className="text-gray-400">{option.description}</p>
            </Link>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-semibold text-white">Contact Support</h2>
          </div>
          <p className="text-gray-400 mb-6">
            Our support team is here to help you with any questions or issues you might have.
            We typically respond within 24 hours.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
} 