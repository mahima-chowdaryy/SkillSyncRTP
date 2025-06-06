'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SkillShoutout() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredSkills: '',
    projectType: '',
    urgency: 'medium',
    deadline: '',
    contactPreference: 'email'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push('/login?redirect=/shoutout');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      const response = await fetch('/api/shoutouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          requiredSkills: formData.requiredSkills.split(',').map(skill => skill.trim())
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to post shoutout');
      }

      router.push('/shoutouts');
    } catch (err) {
      console.error('Error posting shoutout:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="py-12 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Post a Skill Shoutout
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Need urgent help with a project? Let the community know!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-2xl backdrop-blur-sm transform transition-all duration-300 hover:border-gray-600">
          <div className="space-y-6">
            <div className="transform transition-all duration-300 hover:scale-[1.01]">
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/80 text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 sm:text-sm"
                placeholder="e.g., Need React Developer for Final Year Project"
              />
            </div>

            <div className="transform transition-all duration-300 hover:scale-[1.01]">
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Project Description
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/80 text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 sm:text-sm"
                placeholder="Describe your project and what kind of help you need..."
              />
            </div>

            <div className="transform transition-all duration-300 hover:scale-[1.01]">
              <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-300 mb-2">
                Required Skills (comma-separated)
              </label>
              <input
                type="text"
                id="requiredSkills"
                required
                value={formData.requiredSkills}
                onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/80 text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 sm:text-sm"
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Type
                </label>
                <select
                  id="projectType"
                  required
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/80 text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 sm:text-sm"
                >
                  <option value="">Select a type</option>
                  <option value="academic">Academic Project</option>
                  <option value="personal">Personal Project</option>
                  <option value="startup">Startup Project</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-300 mb-2">
                  Urgency Level
                </label>
                <select
                  id="urgency"
                  required
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/80 text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 sm:text-sm"
                >
                  <option value="low">Low - Flexible Timeline</option>
                  <option value="medium">Medium - Within a Week</option>
                  <option value="high">High - Within 48 Hours</option>
                  <option value="urgent">Urgent - Immediate Help Needed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/80 text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 sm:text-sm"
                />
              </div>

              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <label htmlFor="contactPreference" className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Contact Method
                </label>
                <select
                  id="contactPreference"
                  required
                  value={formData.contactPreference}
                  onChange={(e) => setFormData({ ...formData, contactPreference: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-700 bg-gray-800/80 text-white shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 sm:text-sm"
                >
                  <option value="email">Email</option>
                  <option value="message">In-app Message</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-900/50 p-4 border border-red-500/30 transform transition-all duration-300">
              <div className="text-sm text-red-400">{error}</div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </span>
              ) : (
                'Post Shoutout'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 