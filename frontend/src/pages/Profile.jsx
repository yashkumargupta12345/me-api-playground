import { useState, useEffect } from 'react';
import { profileAPI } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await profileAPI.getProfile();
      setProfile(response.data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 404) {
        setProfile(null);
        setError(null);
      } else {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Loading..." />;
  if (error) return <ErrorMessage error={error} onRetry={fetchProfile} />;

  // No profile exists
  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-xl text-white mb-2">No Profile Found</h2>
          <p className="text-gray-400 text-sm">No profile data available</p>
        </div>
      </div>
    );
  }

  // Profile exists
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl text-white mb-6">Profile</h1>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-gray-800 border border-gray-700 rounded p-4">
          <div className="flex items-center gap-4 mb-3">
            {profile.profilePicture ? (
              <img 
                src={profile.profilePicture} 
                alt={profile.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-xl text-white">
                {profile.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <div>
              <h2 className="text-white font-medium text-lg">{profile.name}</h2>
              <p className="text-blue-400 text-sm">{profile.email}</p>
              {profile.location && (
                <p className="text-gray-400 text-sm">{profile.location}</p>
              )}
            </div>
          </div>
          {profile.bio && (
            <p className="text-gray-300 text-sm leading-relaxed">{profile.bio}</p>
          )}
        </div>

        {/* Links */}
        {profile.links && Object.values(profile.links).some(link => link) && (
          <div className="bg-gray-800 border border-gray-700 rounded p-4">
            <h3 className="text-white font-medium mb-3">Links</h3>
            <div className="flex flex-wrap gap-3 text-sm">
              {profile.links.github && (
                <a 
                  href={profile.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  GitHub
                </a>
              )}
              {profile.links.linkedin && (
                <a 
                  href={profile.links.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  LinkedIn
                </a>
              )}
              {profile.links.portfolio && (
                <a 
                  href={profile.links.portfolio} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Portfolio
                </a>
              )}
              {profile.links.resume && (
                <a 
                  href={profile.links.resume} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Resume
                </a>
              )}
            </div>
          </div>
        )}

        {/* Education */}
        {profile.education && profile.education.length > 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded p-4">
            <h3 className="text-white font-medium mb-3">Education</h3>
            <div className="space-y-3">
              {profile.education.map((edu, index) => (
                <div key={index} className="bg-gray-700 rounded p-3">
                  <div className="text-white text-sm font-medium">
                    {edu.degree} in {edu.field}
                  </div>
                  <div className="text-gray-400 text-xs">{edu.institution}</div>
                  <div className="text-gray-500 text-xs">
                    {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {profile.work && profile.work.length > 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded p-4">
            <h3 className="text-white font-medium mb-3">Work Experience</h3>
            <div className="space-y-3">
              {profile.work.map((job, index) => (
                <div key={index} className="bg-gray-700 rounded p-3">
                  <div className="text-white text-sm font-medium">{job.position}</div>
                  <div className="text-blue-400 text-xs">{job.company}</div>
                  <div className="text-gray-500 text-xs mb-2">
                    {new Date(job.startDate).toLocaleDateString()} - 
                    {job.current ? ' Present' : ` ${new Date(job.endDate).toLocaleDateString()}`}
                  </div>
                  {job.description && (
                    <p className="text-gray-300 text-xs mb-2">{job.description}</p>
                  )}
                  {job.technologies && job.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {job.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;