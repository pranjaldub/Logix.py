import React, { useEffect } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const features = [
    {
      title: "Code Visualization",
      description:
        "Transform your Python code into interactive visual representations",
      icon: (
        <svg
          className="w-12 h-12 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
    },
    {
      title: "Smart Optimization",
      description:
        "Get intelligent suggestions to improve your code's performance",
      icon: (
        <svg
          className="w-12 h-12 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Auto Documentation",
      description:
        "Generate comprehensive comments and explanations automatically",
      icon: (
        <svg
          className="w-12 h-12 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  const futureFeatures = [
    {
      title: "AI-Powered Code Generation",
      description:
        "Advanced machine learning algorithms to suggest and generate optimal code solutions.",
      timeline: "Q3 2024",
    },
    {
      title: "Real-time Collaboration",
      description:
        "Work together with team members in real-time, share visualizations, and collaborate on code.",
      timeline: "Q4 2024",
    },
    {
      title: "Advanced Code Analysis",
      description:
        "Deep learning-based code analysis for identifying complex patterns and improvements.",
      timeline: "Q1 2025",
    },
  ];

  const AnimatedSection = ({ children }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      threshold: 0.2,
      triggerOnce: true,
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <motion.section
        style={{ scale }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#111] pattern-grid-lg opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Logix.py
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Transform your Python code with powerful visualization,
              optimization, and documentation tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/app"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Launch App
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </motion.div>
              <motion.a
                href="#features"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Learn More
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <a
            href="#features"
            className="text-white opacity-60 hover:opacity-100 transition-opacity"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-400">
                Everything you need to analyze and improve your Python code
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-[#111] border border-zinc-800 rounded-xl p-8 h-full backdrop-blur-sm relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  <div className="relative z-10">
                    <div className="mb-6 text-blue-500">{feature.icon}</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400">{feature.description}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Future Scope Section */}
      <section id="future" className="py-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Future Development
              </h2>
              <p className="text-zinc-400">
                Exciting features coming to Logix.py
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {futureFeatures.map((feature, index) => (
              <AnimatedSection key={feature.title}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#111] border border-zinc-800 rounded-xl p-8 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  <div className="relative z-10">
                    <div className="absolute top-0 right-0 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-bl-lg backdrop-blur-sm border border-blue-500/20">
                      {feature.timeline}
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-4 mt-6">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400">{feature.description}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-zinc-400">
                Have questions or suggestions? We'd love to hear from you.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-[#111] border border-zinc-800 rounded-xl p-8 shadow-2xl relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <div className="relative z-10">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-zinc-400 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-zinc-400 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-zinc-400 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10">Send Message</span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#111] border border-zinc-800 rounded-lg p-6 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Email
                  </h3>
                  <p className="text-zinc-400">support@logix.py</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#111] border border-zinc-800 rounded-lg p-6 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    GitHub
                  </h3>
                  <p className="text-zinc-400">github.com/logix-py</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#111] border border-zinc-800 rounded-lg p-6 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Discord
                  </h3>
                  <p className="text-zinc-400">discord.gg/logix-py</p>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
