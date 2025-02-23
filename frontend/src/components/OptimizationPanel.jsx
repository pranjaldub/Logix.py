import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const OptimizationPanel = ({ code }) => {
  const [optimizations, setOptimizations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    const analyzeCode = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://42d3581d-957a-4c55-9437-ebc92ce5e8fc.backend.makeasite.io/optimize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to analyze code');
        }

        const data = await response.json();
        setOptimizations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    analyzeCode();
  }, [code]);

  return (
    <motion.div
      className="p-4 h-[600px] overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Code Optimization</h2>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && optimizations && (
        <div className="space-y-4">
          {optimizations.suggestions?.map((suggestion, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${suggestion.severity === 'high' ? 'bg-red-100 text-red-600' :
                    suggestion.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'}
                `}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{suggestion.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{suggestion.description}</p>
                  {suggestion.example && (
                    <div className="mt-3 bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-500 mb-1">Suggested Implementation:</p>
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">{suggestion.example}</pre>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {(!optimizations.suggestions || optimizations.suggestions.length === 0) && (
            <div className="text-center text-gray-500 py-8">
              No optimization suggestions found for the current code.
            </div>
          )}
        </div>
      )}

      {!loading && !error && !optimizations && (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Enter some code to see optimization suggestions
        </div>
      )}
    </motion.div>
  );
};

export default OptimizationPanel;