'use client';

export default function ProjectDetailsModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Status Badge */}
          <div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              project.status === 'Completed' ? 'bg-green-100 text-green-800' :
              project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
              project.status === 'Recruiting' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {project.status}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Description</h3>
            <p className="text-gray-300">{project.description}</p>
          </div>

          {/* Required Skills */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Team Lead */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Team Lead</h3>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                  {project.lead.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium">{project.lead.name}</p>
                  <p className="text-gray-400 text-sm">{project.lead.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Team Members</h3>
            <div className="space-y-2">
              {project.members.map((member) => (
                <div key={member.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                      {member.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-gray-400 text-sm">{member.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join Requests */}
          {project.joinRequests.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Pending Join Requests</h3>
              <div className="space-y-2">
                {project.joinRequests.map((request) => (
                  <div key={request.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                          {request.user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-white font-medium">{request.user.name}</p>
                          <p className="text-gray-400 text-sm">{request.user.email}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 