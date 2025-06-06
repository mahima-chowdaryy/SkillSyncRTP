'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [collabRequests, setCollabRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    // Fetch collaboration requests
    const fetchRequests = async () => {
      try {
        const response = await fetch(`/api/collab-requests/${user.id}`);
        const data = await response.json();
        setCollabRequests(data.received || []);
        setSentRequests(data.sent || []);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    if (user) {
      fetchRequests();
    }
  }, [user]);

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
                  href={`/dashboard/profile/${user.id}`}
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

        {/* Collaboration Requests Section */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {/* Received Requests */}
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-white">Collaboration Requests</h3>
              <p className="mt-1 text-sm text-gray-400">
                Review requests from other students
              </p>
              <div className="mt-4 space-y-4">
                {collabRequests.length > 0 ? (
                  collabRequests.map((request) => (
                    <div key={request._id} className="bg-gray-700/50 p-4 rounded-md border border-gray-600">
                      <p className="text-white font-medium">{request.fromName}</p>
                      <p className="text-gray-300 text-sm mt-1">{request.message}</p>
                      <div className="mt-3 flex gap-2">
                        <Link
                          href={`/dashboard/profile/${request.fromId}`}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={() => handleRequestResponse(request._id, 'accept')}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRequestResponse(request._id, 'reject')}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No pending requests</p>
                )}
              </div>
            </div>
          </div>

          {/* Sent Requests */}
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-white">Sent Requests</h3>
              <p className="mt-1 text-sm text-gray-400">
                Track your sent collaboration requests
              </p>
              <div className="mt-4 space-y-4">
                {sentRequests.length > 0 ? (
                  sentRequests.map((request) => (
                    <div key={request._id} className="bg-gray-700/50 p-4 rounded-md border border-gray-600">
                      <p className="text-white font-medium">{request.toName}</p>
                      <p className="text-gray-300 text-sm mt-1">{request.message}</p>
                      <p className="text-gray-400 text-xs mt-2">
                        Status: <span className={`font-medium ${request.status === 'pending' ? 'text-yellow-400' : request.status === 'accepted' ? 'text-green-400' : 'text-red-400'}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No sent requests</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 