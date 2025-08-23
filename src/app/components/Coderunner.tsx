"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Output from "./Output";

const Coderunner = () => {
  const [code, setCode] = useState<string>(`#include <iostream>
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`);
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setOutput(""); // clear previous output

    try {
      const res = await fetch("/api/run-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: "cpp", code }),
      });

      if (!res.ok) {
        const error = await res.text();
        setOutput(`Error: ${error}`);
      } else {
        const data = await res.json();
        setOutput(data.output || "No output");
      }
    } catch (error) {
      setOutput("Failed to run code");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex-1 border border-gray-300 rounded-lg shadow-md flex flex-col bg-white">
      <div className="flex justify-between items-center bg-gray-100 border-b border-gray-300 px-4 py-2">
        <div className="font-mono font-semibold text-gray-700">main.cpp</div>
        <div>
          {isLoading ? (
            <button
              disabled
              className="p-2 px-4 rounded-xl bg-blue-300 font-bold text-white cursor-not-allowed flex items-center"
            >
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="ml-2">Running...</span>
            </button>
          ) : (
            <button
              className="p-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white"
              onClick={handleSubmit}
            >
              Run
            </button>
          )}
        </div>
      </div>

      <div className="flex-1">
        <Editor
          height="100%"
          language="cpp"
          value={code}
          onChange={(value) => setCode(value ?? "")}
          theme="vs-light"
          options={{
            fontSize: 15,
            minimap: { enabled: false },
            automaticLayout: true,
            fontFamily: "'Fira Mono', Consolas, 'Courier New', monospace",
          }}
        />
      </div>

      <Output output={output} />
    </div>
  );
};

export default Coderunner;
