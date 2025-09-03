import { useState } from 'react';
import { searchAPI } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await searchAPI.search(query);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl text-white mb-4">Search</h1>
      
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search everything..."
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-4 py-2 bg-blue-600 disabled:bg-gray-600 text-white text-sm rounded"
        >
          Search
        </button>
      </form>

      {loading && <Loading message="Searching..." />}
      {error && <ErrorMessage error={error} />}

      {results && (
        <div className="space-y-6">
          <p className="text-blue-200 text-sm">
            Found {results.totalResults} results for "{results.query}"
          </p>

          {/* Skills */}
          {results.results.skills.length > 0 && (
            <div>
              <h3 className="text-white mb-2">Skills ({results.results.skills.length})</h3>
              <div className="flex flex-wrap gap-2">
                {results.results.skills.map((skill, i) => (
                  <span key={i} className={`px-2 py-1 text-xs rounded ${
                    skill.level === 'Expert' ? 'bg-green-600' :
                    skill.level === 'Advanced' ? 'bg-blue-600' :
                    skill.level === 'Intermediate' ? 'bg-yellow-600' : 'bg-gray-600'
                  } text-white`}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {results.results.projects.length > 0 && (
            <div>
              <h3 className="text-white mb-2">Projects ({results.results.projects.length})</h3>
              <div className="space-y-2">
                {results.results.projects.map((project, i) => (
                  <div key={i} className="bg-gray-800 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm font-medium">{project.title}</span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        project.status === 'Completed' ? 'bg-green-600' : 'bg-yellow-600'
                      } text-white`}>
                        {project.status}
                      </span>
                    </div>
                    {project.description && (
                      <p className="text-gray-300 text-xs mt-1">{project.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work */}
          {results.results.work.length > 0 && (
            <div>
              <h3 className="text-white mb-2">Work ({results.results.work.length})</h3>
              <div className="space-y-2">
                {results.results.work.map((job, i) => (
                  <div key={i} className="bg-gray-800 rounded p-3">
                    <div className="text-white text-sm font-medium">{job.position}</div>
                    <div className="text-blue-400 text-xs">{job.company}</div>
                    {job.description && (
                      <p className="text-gray-300 text-xs mt-1">{job.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {results.results.education.length > 0 && (
            <div>
              <h3 className="text-white mb-2">Education ({results.results.education.length})</h3>
              <div className="space-y-2">
                {results.results.education.map((edu, i) => (
                  <div key={i} className="bg-gray-800 rounded p-3">
                    <div className="text-white text-sm">{edu.degree} in {edu.field}</div>
                    <div className="text-blue-400 text-xs">{edu.institution}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.totalResults === 0 && (
            <p className="text-gray-400 text-center py-8">No results found</p>
          )}
        </div>
      )}

      {!results && !loading && (
        <p className="text-gray-400 text-center py-8">Start typing to search</p>
      )}
    </div>
  );
};

export default Search;