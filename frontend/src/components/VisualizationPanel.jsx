import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const VisualizationPanel = ({ code }) => {
  const [visualization, setVisualization] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    const visualizeCode = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://42d3581d-957a-4c55-9437-ebc92ce5e8fc.backend.makeasite.io/visualize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to visualize code');
        }

        const data = await response.json();
        setVisualization(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    visualizeCode();
  }, [code]);

  return (
    <motion.div
      className="p-4 h-[600px] overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Code Visualization</h2>
      
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

      {!loading && !error && visualization && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Flow Diagram</h3>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">
              {visualization.flowDiagram}
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Variable Dependencies</h3>
            <div className="grid grid-cols-2 gap-4">
              {visualization.variables?.map((variable, index) => (
                <div key={index} className="bg-white p-3 rounded shadow-sm">
                  <span className="font-mono text-sm">{variable}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Function Call Graph</h3>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">
              {visualization.callGraph}
            </pre>
          </div>
        </div>
      )}

      {!loading && !error && !visualization && (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Enter some code to see the visualization
        </div>
      )}
    </motion.div>
  );
};

export default VisualizationPanel;