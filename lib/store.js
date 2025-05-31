// In-memory store for projects
let projects = [
  {
    id: '1',
    title: 'SkillSync Platform',
    description: 'A platform for students to find and collaborate on projects',
    skills: ['React', 'Node.js', 'MongoDB'],
    status: 'In Progress',
    members: [
      { id: '1', name: 'Mahima Tatineni', email: 'mahimatatineni@gmail.com' }
    ],
    lead: { id: '1', name: 'Mahima Tatineni', email: 'mahimatatineni@gmail.com' },
    joinRequests: []
  },
  {
    id: '2',
    title: 'AI Study Assistant',
    description: 'An AI-powered study assistant to help students learn better',
    skills: ['Python', 'TensorFlow', 'React'],
    status: 'Planning',
    members: [
      { id: '1', name: 'Mahima Tatineni', email: 'mahimatatineni@gmail.com' }
    ],
    lead: { id: '1', name: 'Mahima Tatineni', email: 'mahimatatineni@gmail.com' },
    joinRequests: []
  },
  {
    id: '3',
    title: 'Smart Campus Navigation',
    description: 'A mobile app for navigating college campuses with real-time updates',
    skills: ['Flutter', 'Firebase', 'Google Maps API'],
    status: 'Recruiting',
    members: [
      { id: '1', name: 'Mahima Tatineni', email: 'mahimatatineni@gmail.com' }
    ],
    lead: { id: '1', name: 'Mahima Tatineni', email: 'mahimatatineni@gmail.com' },
    joinRequests: []
  },
  {
    id: '4',
    title: 'Virtual Study Groups',
    description: 'A platform for students to create and join virtual study groups',
    skills: ['Vue.js', 'WebRTC', 'Node.js'],
    status: 'Planning',
    members: [
      { id: '1', name: 'Mahima Tatineni', email: 'mahimatatineni@gmail.com' }
    ],
    lead: { id: '1', name: 'Mahima Tatineni', email: 'mahimatatineni@gmail.com' },
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
  
  projects[index] = { ...projects[index], ...updates };
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
  if (status === 'Approved') {
    project.members.push(request.user);
  }

  return request;
}; 