'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function About() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            About SkillSync
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Connecting Students, Empowering Collaboration
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <section className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              SkillSync is a platform designed to bridge the gap between students with complementary skills. 
              We believe in the power of collaboration and knowledge sharing to create meaningful learning experiences 
              and successful projects.
            </p>
          </section>

          <section className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-indigo-400">Skill Discovery</h3>
                <p className="text-gray-300">
                  Find students with the exact skills you need for your projects. Our advanced search 
                  helps you connect with the right collaborators.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-indigo-400">Profile Management</h3>
                <p className="text-gray-300">
                  Showcase your skills, education, and experience. Keep your profile updated to attract 
                  the right opportunities.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-indigo-400">Project Collaboration</h3>
                <p className="text-gray-300">
                  Connect with other students to work on projects, share knowledge, and build your 
                  professional network.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-indigo-400">Learning & Growth</h3>
                <p className="text-gray-300">
                  Learn from peers, discover new technologies, and enhance your skills through 
                  collaborative projects.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4">Get Started</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Link 
                    href="/signup"
                    className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
                  >
                    Join SkillSync
                  </Link>
                  <Link 
                    href="/login"
                    className="inline-flex justify-center items-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-900"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href="/users"
                    className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
                  >
                    Find Students
                  </Link>
                  <Link 
                    href="/profile"
                    className="inline-flex justify-center items-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-900"
                  >
                    View Profile
                  </Link>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 