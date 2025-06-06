'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import EmailSender from './EmailSender';
import { toast } from 'react-hot-toast';

export default function JoinRequestForm({ project, onClose }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    skills: user?.skills?.join(', ') || '',
    availability: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailData, setEmailData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name?.trim()) {
      throw new Error('Name is required');
    }
    if (!formData.email?.trim()) {
      throw new Error('Email is required');
    }
    if (!formData.skills?.trim()) {
      throw new Error('Skills are required');
    }
    if (!formData.availability?.trim()) {
      throw new Error('Availability is required');
    }
    if (!formData.message?.trim()) {
      throw new Error('Message is required');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form data
      validateForm();

      // First save the request to the database
      const response = await fetch('/api/collab-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: project._id,
          userId: user._id,
          name: formData.name.trim(),
          email: formData.email.trim(),
          skills: formData.skills.trim(),
          availability: formData.availability.trim(),
          message: formData.message.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send request');
      }

      // Show success message
      toast.success('Request sent successfully!');
      
      // Prepare email data with all required fields
      const emailParams = {
        toEmail: project.lead?.email || project.owner?.email,
        toName: project.lead?.name || project.owner?.name || 'Team Lead',
        fromName: formData.name.trim(),
        fromEmail: formData.email.trim(),
        subject: 'New Project Collaboration Request',
        message: formData.message.trim(),
        type: 'project',
        projectTitle: project.title,
        skills: formData.skills.trim(),
        availability: formData.availability.trim(),
        actionLink: `${window.location.origin}/dashboard/requests`
      };

      console.log('Preparing to send email with params:', emailParams);

      // Set email data to trigger EmailSender
      setEmailData(emailParams);

      // Close the form after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (err) {
      console.error('Request error:', err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSuccess = (result) => {
    console.log('Email sent successfully:', result);
    toast.success('Email notification sent successfully!');
  };

  const handleEmailError = (error) => {
    console.error('Email error:', error);
    // Don't show error to user since request was saved
    // Just log it for debugging
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">Join Project Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Availability</label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              placeholder="e.g., 10 hours/week"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
      {emailData && (
        <EmailSender
          data={emailData}
          onSuccess={handleEmailSuccess}
          onError={handleEmailError}
        />
      )}
    </div>
  );
} 