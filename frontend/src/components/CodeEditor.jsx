import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as monaco from 'monaco-editor';

const CodeEditor = ({ code, setCode }) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      monacoRef.current = monaco.editor.create(editorRef.current, {
        value: code,
        language: 'python',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: {
          enabled: true
        },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: true,
        scrollBeyondLastLine: false,
        readOnly: false,
        cursorStyle: 'line',
        wordWrap: 'on'
      });

      monacoRef.current.onDidChangeModelContent(() => {
        setCode(monacoRef.current.getValue());
      });

      return () => {
        monacoRef.current?.dispose();
      };
    }
  }, []);

  return (
    <motion.div
      className="h-[600px] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Python Code Editor</h2>
        <div className="space-x-2">
          <button
            onClick={() => setCode('')}
            className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            Clear
          </button>
          <button
            onClick={() => {
              // Add sample code
              const sampleCode = 'def example():\n    print("Hello, Logix.py!")';
              setCode(sampleCode);
              monacoRef.current?.setValue(sampleCode);
            }}
            className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200"
          >
            Sample
          </button>
        </div>
      </div>
      <div
        ref={editorRef}
        className="h-[calc(100%-2rem)] w-full border border-gray-200 rounded-lg overflow-hidden"
      />
    </motion.div>
  );
};

export default CodeEditor;