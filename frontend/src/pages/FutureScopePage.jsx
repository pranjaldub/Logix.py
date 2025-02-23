import React from 'react';
import { motion } from 'framer-motion';

const FutureScopePage = () => {
  const futureFeatures = [
    {
      title: 'AI-Powered Code Generation',
      description: 'Advanced machine learning algorithms to suggest and generate optimal code solutions based on your requirements.',
      timeline: 'Q3 2024'
    },
    {
      title: 'Real-time Collaboration',
      description: 'Work together with team members in real-time, share visualizations, and collaborate on code optimization.',
      timeline: 'Q4 2024'
    },
    {
      title: 'Advanced Code Analysis',
      description: 'Deep learning-based code analysis for identifying complex patterns and potential improvements.',
      timeline: 'Q1 2025'
    },
    {
      title: 'Custom Visualization Templates',
      description: 'Create and share custom visualization templates for different types of code structures.',
      timeline: 'Q2 2025'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Future Development Roadmap
          </h1>
          <p className="text-xl text-gray-400">
            Exciting features and improvements coming to Logix.py
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {futureFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 rounded-bl-lg">
                {feature.timeline}
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4 mt-6">
                {feature.title}
              </h2>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gray-800 rounded-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Community Feedback
          </h2>
          <p className="text-gray-400 mb-6">
            We're constantly evolving based on user feedback and needs. Have a feature in mind?
            Share your ideas with us through our contact form or join our community discussions.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Submit Feature Request
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default FutureScopePage;