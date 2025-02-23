import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CodeEditor from "./components/CodeEditor";
import VisualizationPanel from "./components/VisualizationPanel";
import OptimizationPanel from "./components/OptimizationPanel";
import CommentsPanel from "./components/CommentsPanel";
import ExplanationPanel from "./components/ExplanationPanel";
import LandingPage from "./pages/LandingPage";
import FeaturesPage from "./pages/FeaturesPage";
import FutureScopePage from "./pages/FutureScopePage";
import ContactPage from "./pages/ContactPage";

function MainApp() {
  const [code, setCode] = useState("");
  const [activePanel, setActivePanel] = useState("visualization");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-indigo-600">
                Logix.py
              </Link>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActivePanel("visualization")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePanel === "visualization"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Visualization
              </button>
              <button
                onClick={() => setActivePanel("optimization")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePanel === "optimization"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Optimization
              </button>
              <button
                onClick={() => setActivePanel("comments")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePanel === "comments"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Comments
              </button>
              <button
                onClick={() => setActivePanel("explanation")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activePanel === "explanation"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Explanation
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm"
          >
            <CodeEditor code={code} setCode={setCode} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm"
          >
            {activePanel === "visualization" && (
              <VisualizationPanel code={code} />
            )}
            {activePanel === "optimization" && (
              <OptimizationPanel code={code} />
            )}
            {activePanel === "comments" && <CommentsPanel code={code} />}
            {activePanel === "explanation" && <ExplanationPanel code={code} />}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              Logix.py
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link
              to="/features"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/features"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Features
            </Link>
            <Link
              to="/future"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/future"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Future Scope
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/contact"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Contact
            </Link>
            <Link
              to="/app"
              className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LandingPage />
              </motion.div>
            }
          />
          <Route
            path="/features"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FeaturesPage />
              </motion.div>
            }
          />
          <Route
            path="/future"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FutureScopePage />
              </motion.div>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ContactPage />
              </motion.div>
            }
          />
          <Route
            path="/app"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MainApp />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
