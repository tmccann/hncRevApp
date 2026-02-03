import { Link } from "react-router-dom";
import modulesData from "../data/it-essentials/modules.json";

const ITEssentialsModules = () => {
  const modules = modulesData;

  // Extract checkpoints from modules
  const checkpointIds = [
    ...new Set(modules.flatMap((m) => m.checkpoints || [])),
  ];

  const checkpoints = checkpointIds.map((id) => {
    const moduleNums = id.replace("checkpoint-", "").split("-").map(Number);
    const relatedModules = modules.filter((m) => moduleNums.includes(m.number));
    return {
      id: id,
      title: `Checkpoint: Modules ${moduleNums.join("-")}`,
      description:
        relatedModules.map((m) => m.title).join(" & ") + " combined assessment",
      modules: moduleNums,
      color: "from-purple-500 to-pink-600",
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="text-green-600 hover:text-green-700 font-medium mb-4 inline-block"
          >
            ← Back to Courses
          </Link>
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            IT Essentials 8
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
                {/* Module Header */}
                <div
                  className={`bg-gradient-to-r ${module.color} p-4 text-white`}
                >
                  <div className="text-sm font-semibold mb-1">
                    Module {module.number}
                  </div>
                  <h3 className="text-xl font-bold">{module.title}</h3>
                </div>

                {/* Module Body */}
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-sm text-gray-600 mb-4">
                    {module.description}
                  </p>

                  {/* Topics */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-grow"></div>

                  {/* Actions */}
                  <div className="space-y-2 mt-auto">
                    {module.hasSummary ? (
                      <Link
                        to={`/it-essentials/${module.id}/summary`}
                        className="block w-full bg-gray-100 text-gray-700 text-center py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
                      >
                        📝 View Summary
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="block w-full bg-gray-200 text-gray-400 text-center py-2 rounded-lg font-semibold cursor-not-allowed text-sm"
                      >
                        📝 Summary Coming Soon
                      </button>
                    )}

                    {module.hasQuiz ? (
                      <Link
                        to={`/it-essentials/${module.id}/quiz`}
                        className="block w-full bg-green-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
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

            {/* Coming Soon Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden opacity-60">
              <div className="bg-gradient-to-r from-gray-400 to-gray-500 p-4 text-white">
                <div className="text-sm font-semibold mb-1">More Modules</div>
                <h3 className="text-xl font-bold">Coming Soon</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Additional modules will be added
                </p>
                <button
                  disabled
                  className="block w-full bg-gray-300 text-gray-500 text-center py-2 rounded-lg font-semibold cursor-not-allowed text-sm"
                >
                  Coming Soon
                </button>
              </div>
            </div>
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
                    <p className="text-purple-100 text-sm">
                      {checkpoint.description}
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {checkpoint.modules.length}
                        </div>
                        <div className="text-xs text-gray-600">Modules</div>
                      </div>
                    </div>
                    <Link
                      to={`/it-essentials/${checkpoint.id}/quiz`}
                      className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
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

export default ITEssentialsModules;
