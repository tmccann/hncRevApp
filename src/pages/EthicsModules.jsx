import React from "react";
import { Link } from "react-router-dom";
import modulesData from "../data/ethics/modules.json";

const EthicsModules = () => {
  const modules = modulesData;

  const checkpointIds = [
    ...new Set(modules.flatMap((m) => m.checkpoints || [])),
  ];

  const checkpoints = checkpointIds.map((id) => {
    const moduleNums = id.replace("checkpoint-", "").split("-").map(Number);
    const relatedModules = modules.filter((m) => moduleNums.includes(m.number));
    return {
      id,
      title: `Checkpoint: Modules ${moduleNums.join("-")}`,
      description:
        relatedModules.map((m) => m.title).join(" & ") + " combined assessment",
      modules: moduleNums,
      color: "from-violet-500 to-purple-600",
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="text-violet-600 hover:text-violet-700 font-medium mb-4 inline-block"
          >
            ← Back to Courses
          </Link>
          <h1 className="text-4xl font-bold text-violet-600 mb-2">
            Professional Ethics & Law
          </h1>
          <p className="text-gray-600">
            Select a module to view summary or take quiz
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
                          className="px-2 py-1 bg-violet-50 text-violet-600 rounded text-xs font-medium"
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
                        to={`/ethics/${module.id}/summary`}
                        className="block w-full bg-gray-100 text-gray-700 text-center py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
                      >
                        📝 View Summary
                      </Link>
                    ) : null}

                    {module.hasQuiz ? (
                      <Link
                        to={`/ethics/${module.id}/quiz`}
                        className="block w-full bg-violet-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-violet-700 transition-colors text-sm"
                      >
                        📊 Take Quiz
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="block w-full bg-gray-300 text-gray-400 text-center py-2 rounded-lg font-semibold cursor-not-allowed text-sm"
                      >
                        📊 Quiz Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkpoint Quizzes */}
        {checkpoints.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Checkpoint Quizzes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {checkpoints.map((checkpoint) => (
                <div
                  key={checkpoint.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div
                    className={`bg-gradient-to-r ${checkpoint.color} p-6 text-white`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">✅</span>
                      <h3 className="text-2xl font-bold">{checkpoint.title}</h3>
                    </div>
                    <p className="text-violet-100 text-sm">
                      {checkpoint.description}
                    </p>
                  </div>
                  <div className="p-6">
                    <Link
                      to={`/ethics/${checkpoint.id}/quiz`}
                      className="block w-full bg-violet-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-violet-700 transition-colors"
                    >
                      Start Checkpoint Quiz →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EthicsModules;
