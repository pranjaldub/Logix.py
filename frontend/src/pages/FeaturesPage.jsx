import React from 'react';
import { motion } from 'framer-motion';

const FeaturesPage = () => {
  const features = [
    {
      title: 'Code Visualization',
      description: 'Interactive visualization of code structure and flow',
      details: [
        'Visual representation of code execution flow',
        'Interactive dependency graphs',
        'Real-time visualization updates',
        'Custom visualization layouts'
      ]
    },
    {
      title: 'Code Optimization',
      description: 'Smart suggestions to improve code performance',
      details: [
        'Performance bottleneck detection',
        'Memory usage optimization',
        'Algorithm improvement suggestions',
        'Best practices recommendations'
      ]
    },
    {
      title: 'Auto Documentation',
      description: 'Automated code documentation and explanation',
      details: [
        'Intelligent comment generation',
        'Function documentation',
        'Code explanation in plain English',
        'Documentation export options'
      ]
    },
    {
      title: 'Code Analysis',
      description: 'Deep analysis of code quality and structure',
      details: [
        'Code complexity metrics',
        'Quality score assessment',
        'Security vulnerability scanning',
        'Style guide compliance checks'
      ]
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
            Powerful Features for Code Analysis
          </h1>
          <p className="text-xl text-gray-400">
            Discover the tools that make Logix.py your ultimate code companion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-8"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                {feature.title}
              </h2>
              <p className="text-gray-300 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-start text-gray-400">
                    <svg
                      className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;