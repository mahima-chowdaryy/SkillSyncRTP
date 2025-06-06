import { students } from './sampleData';

// In-memory store for projects
let projects = [
  {
    id: '1',
    title: 'AI-Powered Study Assistant',
    description: 'An intelligent study assistant that helps students learn better using machine learning and natural language processing. Features include personalized learning paths, automated quiz generation, and real-time doubt resolution.',
    skills: ['Python', 'Machine Learning', 'NLP', 'React', 'MongoDB'],
    status: 'In Progress',
    members: [
      { id: '1', name: 'Tatineni Mahima', email: '23r21a6759@mlrit.ac.in' },
      { id: '2', name: students[5].name, email: students[5].email },
      { id: '3', name: students[10].name, email: students[10].email },
      { id: '4', name: students[15].name, email: students[15].email },
      { id: '5', name: students[20].name, email: students[20].email }
    ],
    lead: { id: '1', name: 'Tatineni Mahima', email: '23r21a6759@mlrit.ac.in' },
    joinRequests: []
  },
  {
    id: '2',
    title: 'Smart Campus Navigation',
    description: 'A mobile app for navigating college campuses with real-time updates and location-based services. Includes features like class schedule integration, room finder, and emergency alerts.',
    skills: ['React Native', 'Node.js', 'MongoDB', 'Google Maps API'],
    status: 'Planning',
    members: [
      { id: '1', name: 'Tatineni Mahima', email: '23r21a6759@mlrit.ac.in' },
      { id: '6', name: students[7].name, email: students[7].email },
      { id: '7', name: students[12].name, email: students[12].email },
      { id: '8', name: students[17].name, email: students[17].email },
      { id: '9', name: students[22].name, email: students[22].email }
    ],
    lead: { id: '1', name: 'Tatineni Mahima', email: '23r21a6759@mlrit.ac.in' },
    joinRequests: []
  },
  {
    id: '3',
    title: 'Virtual Study Groups',
    description: 'A platform for students to create and join virtual study groups with real-time collaboration features. Includes video conferencing, shared whiteboard, and document collaboration.',
    skills: ['React', 'Node.js', 'WebRTC', 'MongoDB', 'Socket.io'],
    status: 'Recruiting',
    members: [
      { id: '1', name: 'Tatineni Mahima', email: '23r21a6759@mlrit.ac.in' },
      { id: '10', name: students[8].name, email: students[8].email },
      { id: '11', name: students[13].name, email: students[13].email },
      { id: '12', name: students[18].name, email: students[18].email },
      { id: '13', name: students[23].name, email: students[23].email }
    ],
    lead: { id: '1', name: 'Tatineni Mahima', email: '23r21a6759@mlrit.ac.in' },
    joinRequests: []
  },
  {
    id: '4',
    title: 'Student Resource Hub',
    description: 'A centralized platform for sharing and accessing academic resources, notes, and study materials. Features include resource categorization, search functionality, and user ratings.',
    skills: ['Django', 'React', 'PostgreSQL', 'AWS S3'],
    status: 'Planning',
    members: [
      { id: '1', name: 'Tatineni Mahima', email: '23r21a6759@mlrit.ac.in' },
      { id: '14', name: students[9].name, email: students[9].email },
      { id: '15', name: students[14].name, email: students[14].email },
      { id: '16', name: students[19].name, email: students[19].email },
      { id: '17', name: students[24].name, email: students[24].email }
    ],
    lead: { id: '1', name: 'Tatineni Mahima', email: '23r21a6759@mlrit.ac.in' },
    joinRequests: []
  },
  {
    id: '5',
    title: 'Smart Attendance System',
    description: 'An automated attendance system using facial recognition and QR codes. Includes features like real-time attendance tracking, automated reports, and integration with existing college systems.',
    skills: ['Python', 'OpenCV', 'React', 'Node.js', 'MongoDB'],
    status: 'In Progress',
    members: [
      { id: '1', name: 'Tatineni Mahima', email: '23r21a6759@mlrit.ac.in' },
      { id: '18', name: students[11].name, email: students[11].email },
      { id: '19', name: students[16].name, email: students[16].email },
      { id: '20', name: students[21].name, email: students[21].email },
      { id: '21', name: students[26].name, email: students[26].email }
    ],
    lead: { id: '1', name: 'Tatineni Mahima', email: '23r21a6759@mlrit.ac.in' },
    joinRequests: []
  },
  {
    id: '6',
    title: 'College Event Management',
    description: 'A comprehensive platform for managing college events, workshops, and competitions. Features include event registration, automated notifications, and feedback collection.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    status: 'Recruiting',
    members: [
      { id: '1', name: 'Tatineni Mahima', email: '23r21a6759@mlrit.ac.in' },
      { id: '22', name: students[6].name, email: students[6].email },
      { id: '23', name: students[25].name, email: students[25].email },
      { id: '24', name: students[27].name, email: students[27].email },
      { id: '25', name: students[28].name, email: students[28].email }
    ],
    lead: { id: '1', name: 'Tatineni Mahima', email: '23r21a6759@mlrit.ac.in' },
    joinRequests: []
  }
];

export const getProjects = () => projects;

export const getProject = (id) => {
  return projects.find(p => p.id === id);
};

export const createProject = (project) => {
  const newProject = {
    ...project,
    id: Date.now().toString(),
    members: [project.lead],
    joinRequests: []
  };
  projects.push(newProject);
  return newProject;
};

export const updateProject = (id, updates) => {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;

  projects[index] = {
    ...projects[index],
    ...updates
  };
  return projects[index];
};

export const deleteProject = (id) => {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return false;

  projects.splice(index, 1);
  return true;
};

export const addJoinRequest = (projectId, userId, message) => {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;

  const request = {
    id: Date.now().toString(),
    user: { id: userId, name: 'User ' + userId },
    message,
    status: 'Pending'
  };

  project.joinRequests.push(request);
  return request;
};

export const updateJoinRequest = (projectId, requestId, status) => {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;

  const request = project.joinRequests.find(r => r.id === requestId);
  if (!request) return null;

  request.status = status;
  return request;
}; 