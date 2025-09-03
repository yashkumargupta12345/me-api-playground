import { useState, useEffect } from 'react';
import { projectsAPI } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';


const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);
    

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await projectsAPI.getProjects();
            setProjects(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading message="Loading..." />;
    if (error) return <ErrorMessage error={error} onRetry={fetchProjects} />;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-xl text-white mb-4">Projects</h1>

            <div className="space-y-4">
                {projects.map((project, index) => (
                    <div key={project._id || index} className="bg-gray-800 border border-gray-700 rounded p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-white font-medium">{project.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded ${project.status === 'Completed' ? 'bg-green-600' :
                                    project.status === 'In Progress' ? 'bg-yellow-600' : 'bg-blue-600'
                                } text-white`}>
                                {project.status}
                            </span>
                        </div>

                        {project.description && (
                            <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                        )}

                        {project.technologies?.length > 0 && (
                            <div className="mb-3">
                                <div className="flex flex-wrap gap-1">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.links && (
                            <div className="flex gap-3 text-sm">
                                {project.links.github && (
                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline">GitHub</a>
                                )}
                                {project.links.demo && (
                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline">Demo</a>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;