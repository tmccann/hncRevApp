import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import CourseHome from "./pages/CourseHome";
import CCNAModules from "./pages/CCNAModules";
import ModuleSummary from "./components/ModuleSummary";
import Quiz from "./components/Quiz";

// Import metadata
import modulesData from "./data/ccna/modules.json";

// Vite's glob import - automatically imports ALL files matching the pattern
const summaryFiles = import.meta.glob("./data/ccna/*-summary.json", {
  eager: true,
});
const quizFiles = import.meta.glob("./data/ccna/*-quiz.json", { eager: true });

// Convert glob results to easy lookup maps
const summaryMap = {};
const quizMap = {};

Object.keys(summaryFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  summaryMap[filename.replace("-summary", "")] = summaryFiles[path].default;
});

Object.keys(quizFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  quizMap[filename.replace("-quiz", "")] = quizFiles[path].default;
});

// Dynamic Module Summary Loader
const DynamicModuleSummary = () => {
  const { moduleId } = useParams();
  const summaryData = summaryMap[moduleId];

  if (!summaryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Summary Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            This module summary hasn't been created yet.
          </p>
          <a
            href="/ccna"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to Modules
          </a>
        </div>
      </div>
    );
  }

  return <ModuleSummary summaryData={summaryData} />;
};

// Dynamic Module Quiz Loader
const DynamicModuleQuiz = () => {
  const { moduleId } = useParams();
  const quizData = quizMap[moduleId];
  const moduleInfo = modulesData.find((m) => m.id === moduleId);

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Quiz Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            This module quiz hasn't been created yet.
          </p>
          <a
            href="/ccna"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to Modules
          </a>
        </div>
      </div>
    );
  }

  return (
    <Quiz
      questions={quizData}
      title={`Module ${moduleInfo?.number}: ${moduleInfo?.title} Quiz`}
      description={moduleInfo?.description || ""}
    />
  );
};

// Dynamic Checkpoint Quiz Loader
const DynamicCheckpointQuiz = () => {
  const { checkpointId } = useParams();
  const quizData = quizMap[checkpointId];
  const moduleNums = checkpointId
    .replace("checkpoint-", "")
    .split("-")
    .map(Number);

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Checkpoint Quiz Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            This checkpoint quiz hasn't been created yet.
          </p>
          <a
            href="/ccna"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to Modules
          </a>
        </div>
      </div>
    );
  }

  return (
    <Quiz
      questions={quizData}
      title={`Checkpoint: Modules ${moduleNums.join("-")}`}
      description="Combined assessment"
    />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home - Course Selection */}
        <Route path="/" element={<CourseHome />} />

        {/* CCNA Course */}
        <Route path="/ccna" element={<CCNAModules />} />

        {/* Dynamic Module Routes */}
        <Route
          path="/ccna/:moduleId/summary"
          element={<DynamicModuleSummary />}
        />
        <Route path="/ccna/:moduleId/quiz" element={<DynamicModuleQuiz />} />

        {/* Dynamic Checkpoint Routes */}
        <Route
          path="/ccna/:checkpointId/quiz"
          element={<DynamicCheckpointQuiz />}
        />

        {/* IT Essentials Course (placeholder) */}
        <Route
          path="/it-essentials"
          element={
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  IT Essentials 8
                </h1>
                <p className="text-gray-600 mb-8">Coming Soon</p>
                <a
                  href="/"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  ← Back to Courses
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
