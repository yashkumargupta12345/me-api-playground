import { useState, useEffect } from 'react';
import { skillsAPI } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const [skillsResponse, topSkillsResponse] = await Promise.all([
        skillsAPI.getSkills(),
        skillsAPI.getTopSkills()
      ]);
      
      setSkills(skillsResponse.data);
      setTopSkills(topSkillsResponse.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const groupSkillsByCategory = (skills) => {
    return skills.reduce((acc, skill) => {
      const category = skill.category || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    }, {});
  };

  if (loading) return <Loading message="Loading..." />;
  if (error) return <ErrorMessage error={error} onRetry={fetchSkills} />;

  const displaySkills = activeTab === 'top' ? topSkills : skills;
  const groupedSkills = groupSkillsByCategory(displaySkills);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl text-white mb-4">Skills</h1>
      
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 text-sm rounded ${
            activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          All ({skills.length})
        </button>
        <button
          onClick={() => setActiveTab('top')}
          className={`px-3 py-1 text-sm rounded ${
            activeTab === 'top' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Top ({topSkills.length})
        </button>
      </div>

      {Object.keys(groupedSkills).length === 0 ? (
        <p className="text-gray-400 text-center py-8">No skills found</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h2 className="text-white mb-2 font-medium">{category}</h2>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => (
                  <span 
                    key={index}
                    className={`px-2 py-1 text-xs rounded ${
                      skill.level === 'Expert' ? 'bg-green-600 text-white' :
                      skill.level === 'Advanced' ? 'bg-blue-600 text-white' :
                      skill.level === 'Intermediate' ? 'bg-yellow-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;