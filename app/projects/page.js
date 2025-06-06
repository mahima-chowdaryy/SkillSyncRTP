'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';
import JoinRequestForm from '@/components/JoinRequestForm';
import StatusUpdateForm from '@/components/StatusUpdateForm';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';

export default function Projects() {
  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'AI-Powered Learning Platform',
      description: 'Developing an intelligent learning platform that adapts to individual student needs using machine learning algorithms.',
      status: 'In Progress',
      skills: ['React', 'Node.js', 'Python', 'TensorFlow', 'MongoDB'],
      lead: {
        id: '1',
        name: 'Mahima Tatineni',
        email: '23r21a6759@mlrit.ac.in'
      },
      members: [
        {
          id: '1',
          name: 'Mahima Tatineni',
          email: '23r21a6759@mlrit.ac.in',
          role: 'Team Lead'
        }
      ],
      createdAt: '2024-03-15'
    },
    {
      id: '2',
      title: 'Smart Campus Navigation',
      description: 'Creating an AR-based navigation system for campus visitors and new students.',
      status: 'Recruiting',
      skills: ['Unity', 'C#', 'AR Core', 'Firebase', 'Google Maps API'],
      lead: {
        id: '1',
        name: 'Mahima Tatineni',
        email: '23r21a6759@mlrit.ac.in'
      },
      members: [
        {
          id: '1',
          name: 'Mahima Tatineni',
          email: '23r21a6759@mlrit.ac.in',
          role: 'Team Lead'
        }
      ],
      createdAt: '2024-03-10'
    },
    {
      id: '3',
      title: 'EcoTrack - Environmental Monitoring',
      description: 'IoT-based system for monitoring and analyzing environmental parameters in real-time.',
      status: 'Planning',
      skills: ['IoT', 'Python', 'Raspberry Pi', 'Data Analysis', 'Cloud Computing'],
      lead: {
        id: '1',
        name: 'Mahima Tatineni',
        email: '23r21a6759@mlrit.ac.in'
      },
      members: [
        {
          id: '1',
          name: 'Mahima Tatineni',
          email: '23r21a6759@mlrit.ac.in',
          role: 'Team Lead'
        }
      ],
      createdAt: '2024-03-05'
    },
    {
      id: '4',
      title: 'Virtual Lab Simulator',
      description: 'An interactive virtual laboratory platform for conducting science experiments in a safe, virtual environment.',
      status: 'Recruiting',
      skills: ['Three.js', 'WebGL', 'React', 'Node.js', 'WebRTC'],
      lead: {
        id: '1',
        name: 'Mahima Tatineni',
        email: '23r21a6759@mlrit.ac.in'
      },
      members: [
        {
          id: '1',
          name: 'Mahima Tatineni',
          email: '23r21a6759@mlrit.ac.in',
          role: 'Team Lead'
        }
      ],
      createdAt: '2024-03-01'
    },
    {
      id: '5',
      title: 'Smart Attendance System',
      description: 'Automated attendance tracking system using facial recognition and geolocation.',
      status: 'In Progress',
      skills: ['Python', 'OpenCV', 'Flask', 'MongoDB', 'React Native'],
      lead: {
        id: '1',
        name: 'Mahima Tatineni',
        email: '23r21a6759@mlrit.ac.in'
      },
      members: [
        {
          id: '1',
          name: 'Mahima Tatineni',
          email: '23r21a6759@mlrit.ac.in',
          role: 'Team Lead'
        }
      ],
      createdAt: '2024-02-28'
    },
    {
      id: '6',
      title: 'Student Resource Hub',
      description: 'Centralized platform for students to access study materials, assignments, and collaborate with peers.',
      status: 'Planning',
      skills: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
      lead: {
        id: '1',
        name: 'Mahima Tatineni',
        email: '23r21a6759@mlrit.ac.in'
      },
      members: [
        {
          id: '1',
          name: 'Mahima Tatineni',
          email: '23r21a6759@mlrit.ac.in',
          role: 'Team Lead'
        }
      ],
      createdAt: '2024-02-25'
    },
    {
      id: '7',
      title: 'Campus Event Manager',
      description: 'Digital platform for managing and promoting campus events, workshops, and activities.',
      status: 'Recruiting',
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
      lead: {
        id: '1',
        name: 'Mahima Tatineni',
        email: '23r21a6759@mlrit.ac.in'
      },
      members: [
        {
          id: '1',
          name: 'Mahima Tatineni',
          email: '23r21a6759@mlrit.ac.in',
          role: 'Team Lead'
        }
      ],
      createdAt: '2024-02-20'
    },
    {
      id: '8',
      title: 'Smart Library Management',
      description: 'Automated library management system with RFID integration and digital catalog.',
      status: 'In Progress',
      skills: ['Java', 'Spring Boot', 'MySQL', 'React', 'RFID Integration'],
      lead: {
        id: '1',
        name: 'Mahima Tatineni',
        email: '23r21a6759@mlrit.ac.in'
      },
      members: [
        {
          id: '1',
          name: 'Mahima Tatineni',
          email: '23r21a6759@mlrit.ac.in',
          role: 'Team Lead'
        }
      ],
      createdAt: '2024-02-15'
    },
    {
      id: '9',
      title: 'Campus Safety App',
      description: 'Mobile application for emergency alerts, safety reporting, and campus security features.',
      status: 'Planning',
      skills: ['Flutter', 'Firebase', 'Google Maps API', 'Push Notifications', 'REST APIs'],
      lead: {
        id: '1',
        name: 'Mahima Tatineni',
        email: '23r21a6759@mlrit.ac.in'
      },
      members: [
        {
          id: '1',
          name: 'Mahima Tatineni',
          email: '23r21a6759@mlrit.ac.in',
          role: 'Team Lead'
        }
      ],
      createdAt: '2024-02-10'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showStatusForm, setShowStatusForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const router = useRouter();

  // Mock current user (replace with actual user authentication)
  const currentUser = {
    id: '2',
    name: 'Random User',
    email: 'random@example.com'
  };

  const filteredProjects = projects.filter(project => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search) ||
      project.skills.some(skill => skill.toLowerCase().includes(search)) ||
      project.lead?.name?.toLowerCase().includes(search) ||
      project.lead?.email?.toLowerCase().includes(search) ||
      (project.members && project.members.some(member =>
        member.name?.toLowerCase().includes(search) ||
        member.email?.toLowerCase().includes(search)
      ));
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const isProjectMember = (project) => {
    return project.members.some(member => member.id === currentUser.id);
  };

  const isProjectLead = (project) => {
    return project.lead.id === currentUser.id;
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <button
            onClick={() => router.push('/projects/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Project
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full sm:w-48">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-800 text-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Recruiting">Recruiting</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800/50 backdrop-blur-sm overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-all duration-200 border border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'Completed' ? 'bg-green-900/50 text-green-200' :
                    project.status === 'In Progress' ? 'bg-blue-900/50 text-blue-200' :
                    project.status === 'Recruiting' ? 'bg-yellow-900/50 text-yellow-200' :
                    'bg-gray-700/50 text-gray-200'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/50 text-indigo-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-300">
                    Lead: {project.lead.name}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setShowDetailsModal(true);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      Know More
                    </button>
                    <button
                      onClick={() => {
                        if (isProjectMember(project)) {
                          setSelectedProject(project);
                          setShowStatusForm(true);
                        } else {
                          toast.error("Can't update. You're not a member of the project.");
                        }
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 transition-all duration-200"
                    >
                      Update Status
                    </button>
                    {!isProjectMember(project) && (
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setShowJoinForm(true);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                      >
                        Join Project
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showJoinForm && selectedProject && (
        <JoinRequestForm
          project={selectedProject}
          onClose={() => setShowJoinForm(false)}
          currentUser={currentUser}
        />
      )}

      {showStatusForm && selectedProject && (
        <StatusUpdateForm
          project={selectedProject}
          onClose={() => setShowStatusForm(false)}
        />
      )}

      {showDetailsModal && selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
} 