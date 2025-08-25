"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Output from "./Output";

const Coderunner = () => {
  const [code, setCode] = useState<string>(`#include <iostream>
int main() {
    int a, b;
    std::cin >> a >> b;
    std::cout << a + b << std::endl;
    return 0;
}`);
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setOutput(""); 

    try {
      const res = await fetch("/api/run-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: "cpp", code, input }), // send input too
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
      {/* Header */}
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

      {/* Code editor */}
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

      {/* Input + Output side by side */}
      <div className="flex border-t border-gray-300">
        {/* Input box */}
        <textarea
          className="w-1/2 bg-gray-100 p-3 font-mono text-sm resize-none h-28 outline-none"
          placeholder="Enter custom input here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Output box */}
        <div className="w-1/2">
          <Output output={output} />
        </div>
      </div>
    </div>
  );
};

export default Coderunner;
