'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export default function Shoutouts() {
  const { user } = useAuth();
  const router = useRouter();
  const [shoutouts, setShoutouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    urgency: 'all',
    projectType: 'all',
    search: ''
  });

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/shoutouts');
      return;
    }
    fetchShoutouts();
  }, [user]);

  const fetchShoutouts = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const response = await fetch('/api/shoutouts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch shoutouts');
      }

      setShoutouts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'urgent':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const filteredShoutouts = shoutouts.filter(shoutout => {
    const matchesUrgency = filters.urgency === 'all' || shoutout.urgency === filters.urgency;
    const matchesProjectType = filters.projectType === 'all' || shoutout.projectType === filters.projectType;
    const matchesSearch = shoutout.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         shoutout.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                         shoutout.requiredSkills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()));
    return matchesUrgency && matchesProjectType && matchesSearch;
  });

  if (!user) return null;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Skill Shoutouts
          </h1>
          <p className="mt-3 text-xl text-gray-400">
            Find urgent projects that need your skills
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="urgency" className="block text-sm font-medium text-gray-300 mb-1">
              Urgency Level
            </label>
            <select
              id="urgency"
              value={filters.urgency}
              onChange={(e) => setFilters({ ...filters, urgency: e.target.value })}
              className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="all">All Urgency Levels</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-1">
              Project Type
            </label>
            <select
              id="projectType"
              value={filters.projectType}
              onChange={(e) => setFilters({ ...filters, projectType: e.target.value })}
              className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="all">All Project Types</option>
              <option value="academic">Academic</option>
              <option value="personal">Personal</option>
              <option value="startup">Startup</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search by title, description, or skills..."
              className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-900/50 p-4 mb-8">
            <div className="text-sm text-red-400">{error}</div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-400">Loading shoutouts...</div>
        ) : filteredShoutouts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredShoutouts.map((shoutout) => (
              <div
                key={shoutout._id}
                className="bg-gray-800/50 overflow-hidden rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getUrgencyColor(shoutout.urgency)}`}>
                      {shoutout.urgency.charAt(0).toUpperCase() + shoutout.urgency.slice(1)}
                    </span>
                    <span className="text-sm text-gray-400">
                      {format(new Date(shoutout.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{shoutout.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{shoutout.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {shoutout.requiredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>Project: {shoutout.projectType}</span>
                    <span>Deadline: {format(new Date(shoutout.deadline), 'MMM d, yyyy')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Posted by {shoutout.userId?.name || "Unknown"}
                    </span>
                    <button
                      onClick={() => shoutout.userId?._id && router.push(`/profile/${shoutout.userId._id}`)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-gray-900"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No shoutouts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 