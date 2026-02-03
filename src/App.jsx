import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import CourseHome from "./pages/CourseHome";
import CCNAModules from "./pages/CCNAModules";
import ITEssentialsModules from "./pages/ITEssentialsModules";
import ModuleSummary from "./components/ModuleSummary";
import Quiz from "./components/Quiz";

// Import metadata
import ccnaModulesData from "./data/ccna/modules.json";
import itEssentialsModulesData from "./data/it-essentials/modules.json";

// CCNA Vite glob imports
const ccnaSummaryFiles = import.meta.glob("./data/ccna/*-summary.json", {
  eager: true,
});
const ccnaQuizFiles = import.meta.glob("./data/ccna/*-quiz.json", {
  eager: true,
});

// IT Essentials Vite glob imports
const iteSummaryFiles = import.meta.glob(
  "./data/it-essentials/*-summary.json",
  {
    eager: true,
  },
);
const iteQuizFiles = import.meta.glob("./data/it-essentials/*-quiz.json", {
  eager: true,
});

// Convert CCNA glob results to lookup maps
const ccnaSummaryMap = {};
const ccnaQuizMap = {};

Object.keys(ccnaSummaryFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  ccnaSummaryMap[filename.replace("-summary", "")] =
    ccnaSummaryFiles[path].default;
});

Object.keys(ccnaQuizFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  ccnaQuizMap[filename.replace("-quiz", "")] = ccnaQuizFiles[path].default;
});

// Convert IT Essentials glob results to lookup maps
const iteSummaryMap = {};
const iteQuizMap = {};

Object.keys(iteSummaryFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  iteSummaryMap[filename.replace("-summary", "")] =
    iteSummaryFiles[path].default;
});

Object.keys(iteQuizFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  iteQuizMap[filename.replace("-quiz", "")] = iteQuizFiles[path].default;
});

// Dynamic CCNA Module Summary Loader
const DynamicCCNAModuleSummary = () => {
  const { moduleId } = useParams();
  const summaryData = ccnaSummaryMap[moduleId];

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
          <Link
            to="/ccna"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to Modules
          </Link>
        </div>
      </div>
    );
  }

  return <ModuleSummary data={summaryData} backLink="/ccna" />;
};

// Dynamic CCNA Module Quiz Loader
const DynamicCCNAModuleQuiz = () => {
  const { moduleId } = useParams();
  const quizData = ccnaQuizMap[moduleId];
  const moduleInfo = ccnaModulesData.find((m) => m.id === moduleId);

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
          <Link
            to="/ccna"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to Modules
          </Link>
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

// Dynamic CCNA Checkpoint Quiz Loader
const DynamicCCNACheckpointQuiz = () => {
  const { checkpointId } = useParams();
  const quizData = ccnaQuizMap[checkpointId];
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
          <Link
            to="/ccna"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to Modules
          </Link>
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

// Dynamic IT Essentials Module Summary Loader
const DynamicITEModuleSummary = () => {
  const { moduleId } = useParams();
  const summaryData = iteSummaryMap[moduleId];

  if (!summaryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Summary Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            This module summary hasn't been created yet.
          </p>
          <Link
            to="/it-essentials"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            ← Back to Modules
          </Link>
        </div>
      </div>
    );
  }

  return <ModuleSummary data={summaryData} backLink="/it-essentials" />;
};

// Dynamic IT Essentials Module Quiz Loader
const DynamicITEModuleQuiz = () => {
  const { moduleId } = useParams();
  const quizData = iteQuizMap[moduleId];
  const moduleInfo = itEssentialsModulesData.find((m) => m.id === moduleId);

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Quiz Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            This module quiz hasn't been created yet.
          </p>
          <Link
            to="/it-essentials"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            ← Back to Modules
          </Link>
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

// Dynamic IT Essentials Checkpoint Quiz Loader
const DynamicITECheckpointQuiz = () => {
  const { checkpointId } = useParams();
  const quizData = iteQuizMap[checkpointId];
  const moduleNums = checkpointId
    .replace("checkpoint-", "")
    .split("-")
    .map(Number);

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Checkpoint Quiz Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            This checkpoint quiz hasn't been created yet.
          </p>
          <Link
            to="/it-essentials"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            ← Back to Modules
          </Link>
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
        <Route
          path="/ccna/:moduleId/summary"
          element={<DynamicCCNAModuleSummary />}
        />
        <Route
          path="/ccna/:moduleId/quiz"
          element={<DynamicCCNAModuleQuiz />}
        />
        <Route
          path="/ccna/:checkpointId/quiz"
          element={<DynamicCCNACheckpointQuiz />}
        />

        {/* IT Essentials Course */}
        <Route path="/it-essentials" element={<ITEssentialsModules />} />
        <Route
          path="/it-essentials/:moduleId/summary"
          element={<DynamicITEModuleSummary />}
        />
        <Route
          path="/it-essentials/:moduleId/quiz"
          element={<DynamicITEModuleQuiz />}
        />
        <Route
          path="/it-essentials/:checkpointId/quiz"
          element={<DynamicITECheckpointQuiz />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
