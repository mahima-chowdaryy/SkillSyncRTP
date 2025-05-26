'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Welcome back, {user.name}!
          </h1>
          <p className="mt-3 text-xl text-gray-400 sm:mt-4">
            Manage your profile and connect with other students
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-white">Your Profile</h3>
              <p className="mt-1 text-sm text-gray-400">
                Update your skills, education, and bio
              </p>
              <div className="mt-4">
                <Link
                  href="/profile"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Find Students Card */}
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-white">Find Students</h3>
              <p className="mt-1 text-sm text-gray-400">
                Discover and connect with other students
              </p>
              <div className="mt-4">
                <Link
                  href="/users"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
                >
                  Browse Students
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-white">Your Stats</h3>
              <dl className="mt-4 grid grid-cols-1 gap-4">
                <div className="bg-gray-700/50 px-4 py-3 rounded-md border border-gray-600">
                  <dt className="text-sm font-medium text-gray-300">Skills</dt>
                  <dd className="mt-1 text-2xl font-semibold text-white">
                    {user.skills?.length || 0}
                  </dd>
                </div>
                <div className="bg-gray-700/50 px-4 py-3 rounded-md border border-gray-600">
                  <dt className="text-sm font-medium text-gray-300">Education</dt>
                  <dd className="mt-1 text-2xl font-semibold text-white">
                    {user.education?.length || 0}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 