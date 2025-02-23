import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ExplanationPanel = ({ code }) => {
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    const explainCode = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://42d3581d-957a-4c55-9437-ebc92ce5e8fc.backend.makeasite.io/explain', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate explanation');
        }

        const data = await response.json();
        setExplanation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    explainCode();
  }, [code]);

  return (
    <motion.div
      className="p-4 h-[600px] overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Code Explanation</h2>

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

      {!loading && !error && explanation && (
        <div className="space-y-6">
          <motion.div
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-medium text-gray-900 mb-3">Overview</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {explanation.overview}
            </p>
          </motion.div>

          {explanation.sections?.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h3 className="font-medium text-gray-900 mb-3">{section.title}</h3>
              <div className="space-y-4">
                {section.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">{detail.text}</p>
                    {detail.example && (
                      <pre className="mt-2 text-xs bg-gray-100 p-2 rounded text-gray-700 whitespace-pre-wrap">
                        {detail.example}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {explanation.complexity && (
            <motion.div
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (explanation.sections?.length || 0) * 0.1 }}
            >
              <h3 className="font-medium text-gray-900 mb-3">Time & Space Complexity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-700 mb-1">Time Complexity</p>
                  <p className="text-sm text-gray-600">{explanation.complexity.time}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-700 mb-1">Space Complexity</p>
                  <p className="text-sm text-gray-600">{explanation.complexity.space}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {!loading && !error && !explanation && (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Enter some code to see the explanation
        </div>
      )}
    </motion.div>
  );
};

export default ExplanationPanel;