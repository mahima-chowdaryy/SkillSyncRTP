'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Test() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const handleSeed = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to seed data');
      }

      setSuccess('Sample data seeded successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Test Page
          </h1>
          <p className="mt-3 text-xl text-gray-400 sm:mt-4">
            Seed sample data for testing
          </p>
        </div>

        <div className="mt-8 max-w-xl mx-auto">
          <button
            onClick={handleSeed}
            disabled={loading}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Seeding...' : 'Seed Sample Data'}
          </button>

          {error && (
            <div className="mt-4 rounded-md bg-red-900/50 p-4">
              <div className="text-sm text-red-400">{error}</div>
            </div>
          )}

          {success && (
            <div className="mt-4 rounded-md bg-green-900/50 p-4">
              <div className="text-sm text-green-400">{success}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 