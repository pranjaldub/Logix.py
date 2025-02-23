import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CommentsPanel = ({ code }) => {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    const generateComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://42d3581d-957a-4c55-9437-ebc92ce5e8fc.backend.makeasite.io/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate comments');
        }

        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    generateComments();
  }, [code]);

  return (
    <motion.div
      className="p-4 h-[600px] overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Code Comments</h2>

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

      {!loading && !error && comments && (
        <div className="space-y-6">
          {comments.sections?.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h3 className="font-medium text-gray-900 mb-2">{section.title}</h3>
              <div className="space-y-3">
                {section.comments.map((comment, commentIndex) => (
                  <div key={commentIndex} className="bg-gray-50 p-3 rounded">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">{comment.text}</p>
                        {comment.code && (
                          <pre className="mt-2 text-xs bg-gray-100 p-2 rounded text-gray-700 whitespace-pre-wrap">
                            {comment.code}
                          </pre>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {(!comments.sections || comments.sections.length === 0) && (
            <div className="text-center text-gray-500 py-8">
              No comments generated for the current code.
            </div>
          )}
        </div>
      )}

      {!loading && !error && !comments && (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Enter some code to generate comments
        </div>
      )}
    </motion.div>
  );
};

export default CommentsPanel;