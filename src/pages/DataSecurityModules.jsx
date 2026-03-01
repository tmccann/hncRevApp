import React from "react";
import { Link } from "react-router-dom";
import modulesData from "../data/data-security/modules.json";

const DataSecurityModules = () => {
  const modules = modulesData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="text-rose-600 hover:text-rose-700 font-medium mb-4 inline-block"
          >
            ← Back to Courses
          </Link>
          <h1 className="text-4xl font-bold text-rose-600 mb-2">
            Data Security
          </h1>
          <p className="text-gray-600">
            Select a module to view summary
          </p>
        </div>

        {/* Modules Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Modules</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
              >
                <div
                  className={`bg-gradient-to-r ${module.color} p-4 text-white`}
                >
                  <div className="text-sm font-semibold mb-1">
                    Module {module.number}
                  </div>
                  <h3 className="text-xl font-bold">{module.title}</h3>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-sm text-gray-600 mb-4">
                    {module.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-rose-50 text-rose-600 rounded text-xs font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-grow"></div>

                  <div className="space-y-2 mt-auto">
                    {module.hasSummary ? (
                      <Link
                        to={`/data-security/${module.id}/summary`}
                        className="block w-full bg-gray-100 text-gray-700 text-center py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
                      >
                        📝 View Summary
                      </Link>
                    ) : null}

                    {module.hasQuiz ? (
                      <Link
                        to={`/data-security/${module.id}/quiz`}
                        className="block w-full bg-rose-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-rose-700 transition-colors text-sm"
                      >
                        📊 Take Quiz
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSecurityModules;
