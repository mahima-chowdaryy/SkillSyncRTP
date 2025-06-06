'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [collabMessage, setCollabMessage] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const sampleMessage = `Hi! I'm ${user?.name || 'a 2nd year student'} from CSD-A,MLRIT. I noticed your skills in [relevant skills] and would love to collaborate on a project. I'm particularly interested in [specific area] and think we could create something great together. Would you be interested in discussing potential collaboration opportunities?`;

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      setCollabMessage(sampleMessage);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users?page=${page}&search=${search}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch users');
      }

      setUsers(Array.isArray(data.users) ? data.users : []);
      setTotalPages(data.totalPages || 1);
      setHasSearched(true);
    } catch (err) {
      setError(err.message);
      setUsers([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleCollabRequest = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/collab-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toUser: selectedUser.email,
          fromUser: user.email,
          message: collabMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send collaboration request');
      }

      toast.success('Collaboration request sent successfully!');
      setShowCollabModal(false);
      setCollabMessage('');
      setSelectedUser(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!user) return null;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Find Students
          </h1>
          <p className="mt-3 text-xl text-gray-400 sm:mt-4">
            Discover and connect with other students
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8">
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or skills..."
                className="flex-1 appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 bg-gray-800 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 max-w-xl mx-auto">
            <div className="rounded-md bg-red-900/50 p-4">
              <div className="text-sm text-red-400">{error}</div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="mt-8 text-center text-gray-400">Loading...</div>
        ) : hasSearched ? (
          <>
            {/* Users Grid */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-200"
                  >
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-white">{user.name}</h3>
                      {user.bio && (
                        <p className="mt-1 text-sm text-gray-400">{user.bio}</p>
                      )}
                      
                      {/* Skills */}
                      {user.skills && user.skills.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-300">Skills</h4>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {user.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/50 text-indigo-200 border border-indigo-700"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Education */}
                      {user.education && user.education.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-300">Education</h4>
                          <div className="mt-2 space-y-2">
                            {user.education.map((edu, index) => (
                              <div key={index} className="text-sm text-gray-400">
                                <p className="font-medium">{edu.school}</p>
                                <p>{edu.degree}</p>
                                <p className="text-xs text-gray-500">
                                  {edu.startYear} - {edu.endYear || 'Present'}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Collaboration Request Button */}
                      <div className="mt-4">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowCollabModal(true);
                          }}
                          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
                        >
                          Request Collaboration
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-400">No users found matching your search criteria.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="mt-8 text-center">
            <p className="text-gray-400">Enter a search term to find students.</p>
          </div>
        )}
      </div>

      {/* Collaboration Request Modal */}
      {showCollabModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-white mb-4">
              Request Collaboration with {selectedUser.name}
            </h3>
            <form onSubmit={handleCollabRequest}>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={collabMessage}
                  onChange={(e) => setCollabMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Press Tab for a sample message or write your own..."
                  required
                />
                <p className="mt-2 text-xs text-gray-400">
                  Tip: Press Tab to use a sample message template
                </p>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCollabModal(false);
                    setCollabMessage('');
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 border border-gray-700 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 