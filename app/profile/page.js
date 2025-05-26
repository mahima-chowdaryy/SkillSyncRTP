'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [bio, setBio] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newEducation, setNewEducation] = useState({
    school: '',
    degree: '',
    startYear: '',
    endYear: ''
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    setSkills(user.skills || []);
    setEducation(user.education || []);
    setBio(user.bio || '');
  }, [user]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddEducation = () => {
    if (newEducation.school && newEducation.degree && newEducation.startYear) {
      setEducation([...education, { ...newEducation }]);
      setNewEducation({
        school: '',
        degree: '',
        startYear: '',
        endYear: ''
      });
    }
  };

  const handleRemoveEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      await updateProfile({ bio, skills, education });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Your Profile
          </h1>
          <p className="mt-3 text-xl text-gray-400 sm:mt-4">
            Update your information and showcase your skills
          </p>
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Bio Section */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-white">Bio</h3>
                <div className="mt-4">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-white">Skills</h3>
                <div className="mt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Add a skill"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-900/50 text-indigo-200 border border-indigo-700"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-indigo-400 hover:text-indigo-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-white">Education</h3>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      value={newEducation.school}
                      onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                      className="block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="School"
                    />
                    <input
                      type="text"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                      className="block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Degree"
                    />
                    <input
                      type="number"
                      value={newEducation.startYear}
                      onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
                      className="block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Start Year"
                    />
                    <input
                      type="number"
                      value={newEducation.endYear}
                      onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
                      className="block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="End Year (optional)"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddEducation}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
                  >
                    Add Education
                  </button>
                  <div className="mt-4 space-y-4">
                    {education.map((edu, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700"
                      >
                        <div>
                          <h4 className="text-sm font-medium text-white">{edu.school}</h4>
                          <p className="text-sm text-gray-400">{edu.degree}</p>
                          <p className="text-xs text-gray-500">
                            {edu.startYear} - {edu.endYear || 'Present'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveEducation(index)}
                          className="text-gray-400 hover:text-gray-300"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className="rounded-md bg-green-900/50 p-4">
                <div className="text-sm text-green-400">{success}</div>
              </div>
            )}
            {error && (
              <div className="rounded-md bg-red-900/50 p-4">
                <div className="text-sm text-red-400">{error}</div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 