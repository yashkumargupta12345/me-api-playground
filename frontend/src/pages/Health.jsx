import { useState, useEffect } from 'react';
import { healthAPI } from '../services/api';

const Health = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    try {
      setLoading(true);
      const response = await healthAPI.getHealth();
      setHealthData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch health');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-400 p-4">Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-white mb-4">Health Data</h1>
      
      {healthData && (
        <div className="bg-gray-800 p-4 rounded">
          <pre className="text-white text-sm">
            {JSON.stringify(healthData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Health;