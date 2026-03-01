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
import CompFundamentals from "./pages/CompFundamentals";
import EthicsModules from "./pages/EthicsModules";
import TroubleshootingModules from "./pages/TroubleshootingModules";
import DataSecurityModules from "./pages/DataSecurityModules";
import ModuleSummary from "./components/ModuleSummary";
import Quiz from "./components/Quiz";

// Import metadata
import ccnaModulesData from "./data/ccna/modules.json";
import itEssentialsModulesData from "./data/it-essentials/modules.json";
import compModulesData from "./data/comp-fundamentals/modules.json";
import ethicsModulesData from "./data/ethics/modules.json";
import troubleshootingModulesData from "./data/troubleshooting/modules.json";
import dataSecurityModulesData from "./data/data-security/modules.json";

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
  { eager: true }
);
const iteQuizFiles = import.meta.glob("./data/it-essentials/*-quiz.json", {
  eager: true,
});

// Computer Fundamentals Vite glob imports
const compSummaryFiles = import.meta.glob(
  "./data/comp-fundamentals/*-summary.json",
  { eager: true }
);
const compQuizFiles = import.meta.glob("./data/comp-fundamentals/*-quiz.json", {
  eager: true,
});

// Ethics Vite glob imports
const ethicsSummaryFiles = import.meta.glob("./data/ethics/*-summary.json", {
  eager: true,
});
const ethicsQuizFiles = import.meta.glob("./data/ethics/*-quiz.json", {
  eager: true,
});

// Troubleshooting Vite glob imports
const troubleshootingSummaryFiles = import.meta.glob(
  "./data/troubleshooting/*-summary.json",
  { eager: true }
);
const troubleshootingQuizFiles = import.meta.glob(
  "./data/troubleshooting/*-quiz.json",
  { eager: true }
);

// Data Security Vite glob imports
const dataSecuritySummaryFiles = import.meta.glob(
  "./data/data-security/*-summary.json",
  { eager: true }
);
const dataSecurityQuizFiles = import.meta.glob(
  "./data/data-security/*-quiz.json",
  { eager: true }
);

// Convert CCNA glob results to lookup maps
const ccnaSummaryMap = {};
const ccnaQuizMap = {};
Object.keys(ccnaSummaryFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  ccnaSummaryMap[filename.replace("-summary", "")] = ccnaSummaryFiles[path].default;
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
  iteSummaryMap[filename.replace("-summary", "")] = iteSummaryFiles[path].default;
});
Object.keys(iteQuizFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  iteQuizMap[filename.replace("-quiz", "")] = iteQuizFiles[path].default;
});

// Convert Computer Fundamentals glob results to lookup maps
const compSummaryMap = {};
const compQuizMap = {};
Object.keys(compSummaryFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  compSummaryMap[filename.replace("-summary", "")] = compSummaryFiles[path].default;
});
Object.keys(compQuizFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  compQuizMap[filename.replace("-quiz", "")] = compQuizFiles[path].default;
});

// Convert Ethics glob results to lookup maps
const ethicsSummaryMap = {};
const ethicsQuizMap = {};
Object.keys(ethicsSummaryFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  ethicsSummaryMap[filename.replace("-summary", "")] = ethicsSummaryFiles[path].default;
});
Object.keys(ethicsQuizFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  ethicsQuizMap[filename.replace("-quiz", "")] = ethicsQuizFiles[path].default;
});

// Convert Troubleshooting glob results to lookup maps
const troubleshootingSummaryMap = {};
const troubleshootingQuizMap = {};
Object.keys(troubleshootingSummaryFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  troubleshootingSummaryMap[filename.replace("-summary", "")] = troubleshootingSummaryFiles[path].default;
});
Object.keys(troubleshootingQuizFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  troubleshootingQuizMap[filename.replace("-quiz", "")] = troubleshootingQuizFiles[path].default;
});

// Convert Data Security glob results to lookup maps
const dataSecuritySummaryMap = {};
const dataSecurityQuizMap = {};
Object.keys(dataSecuritySummaryFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  dataSecuritySummaryMap[filename.replace("-summary", "")] = dataSecuritySummaryFiles[path].default;
});
Object.keys(dataSecurityQuizFiles).forEach((path) => {
  const filename = path.split("/").pop().replace(".json", "");
  dataSecurityQuizMap[filename.replace("-quiz", "")] = dataSecurityQuizFiles[path].default;
});

// Dynamic CCNA Module Summary Loader
const DynamicCCNAModuleSummary = () => {
  const { moduleId } = useParams();
  const summaryData = ccnaSummaryMap[moduleId];
  if (!summaryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Summary Not Found</h1>
          <p className="text-gray-600 mb-8">This module summary hasn't been created yet.</p>
          <Link to="/ccna" className="text-indigo-600 hover:text-indigo-700 font-semibold">← Back to Modules</Link>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Not Found</h1>
          <p className="text-gray-600 mb-8">This module quiz hasn't been created yet.</p>
          <Link to="/ccna" className="text-indigo-600 hover:text-indigo-700 font-semibold">← Back to Modules</Link>
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
  const moduleNums = checkpointId.replace("checkpoint-", "").split("-").map(Number);
  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Checkpoint Quiz Not Found</h1>
          <p className="text-gray-600 mb-8">This checkpoint quiz hasn't been created yet.</p>
          <Link to="/ccna" className="text-indigo-600 hover:text-indigo-700 font-semibold">← Back to Modules</Link>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Summary Not Found</h1>
          <p className="text-gray-600 mb-8">This module summary hasn't been created yet.</p>
          <Link to="/it-essentials" className="text-green-600 hover:text-green-700 font-semibold">← Back to Modules</Link>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Not Found</h1>
          <p className="text-gray-600 mb-8">This module quiz hasn't been created yet.</p>
          <Link to="/it-essentials" className="text-green-600 hover:text-green-700 font-semibold">← Back to Modules</Link>
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
  const moduleNums = checkpointId.replace("checkpoint-", "").split("-").map(Number);
  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Checkpoint Quiz Not Found</h1>
          <p className="text-gray-600 mb-8">This checkpoint quiz hasn't been created yet.</p>
          <Link to="/it-essentials" className="text-green-600 hover:text-green-700 font-semibold">← Back to Modules</Link>
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

// Dynamic Computer Fundamentals Module Summary Loader
const DynamicCompModuleSummary = () => {
  const { moduleId } = useParams();
  const summaryData = compSummaryMap[moduleId];
  if (!summaryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Summary Not Found</h1>
          <p className="text-gray-600 mb-8">This module summary hasn't been created yet.</p>
          <Link to="/comp-fundamentals" className="text-emerald-600 hover:text-emerald-700 font-semibold">← Back to Modules</Link>
        </div>
      </div>
    );
  }
  return <ModuleSummary data={summaryData} backLink="/comp-fundamentals" />;
};

// Dynamic Computer Fundamentals Module Quiz Loader
const DynamicCompModuleQuiz = () => {
  const { moduleId } = useParams();
  const quizData = compQuizMap[moduleId];
  const moduleInfo = compModulesData.find((m) => m.id === moduleId);
  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Not Found</h1>
          <p className="text-gray-600 mb-8">This module quiz hasn't been created yet.</p>
          <Link to="/comp-fundamentals" className="text-emerald-600 hover:text-emerald-700 font-semibold">← Back to Modules</Link>
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

// Dynamic Computer Fundamentals Checkpoint Quiz Loader
const DynamicCompCheckpointQuiz = () => {
  const { checkpointId } = useParams();
  const quizData = compQuizMap[checkpointId];
  const moduleNums = checkpointId.replace("checkpoint-", "").split("-").map(Number);
  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Checkpoint Quiz Not Found</h1>
          <p className="text-gray-600 mb-8">This checkpoint quiz hasn't been created yet.</p>
          <Link to="/comp-fundamentals" className="text-emerald-600 hover:text-emerald-700 font-semibold">← Back to Modules</Link>
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

// Dynamic Ethics Module Summary Loader
const DynamicEthicsModuleSummary = () => {
  const { moduleId } = useParams();
  const summaryData = ethicsSummaryMap[moduleId];
  if (!summaryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Summary Not Found</h1>
          <p className="text-gray-600 mb-8">This module summary hasn't been created yet.</p>
          <Link to="/ethics" className="text-violet-600 hover:text-violet-700 font-semibold">← Back to Modules</Link>
        </div>
      </div>
    );
  }
  return <ModuleSummary data={summaryData} backLink="/ethics" />;
};

// Dynamic Ethics Module Quiz Loader
const DynamicEthicsModuleQuiz = () => {
  const { moduleId } = useParams();
  const quizData = ethicsQuizMap[moduleId];
  const moduleInfo = ethicsModulesData.find((m) => m.id === moduleId);
  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Not Found</h1>
          <p className="text-gray-600 mb-8">This module quiz hasn't been created yet.</p>
          <Link to="/ethics" className="text-violet-600 hover:text-violet-700 font-semibold">← Back to Modules</Link>
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

// Dynamic Ethics Checkpoint Quiz Loader
const DynamicEthicsCheckpointQuiz = () => {
  const { checkpointId } = useParams();
  const quizData = ethicsQuizMap[checkpointId];
  const moduleNums = checkpointId.replace("checkpoint-", "").split("-").map(Number);
  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Checkpoint Quiz Not Found</h1>
          <p className="text-gray-600 mb-8">This checkpoint quiz hasn't been created yet.</p>
          <Link to="/ethics" className="text-violet-600 hover:text-violet-700 font-semibold">← Back to Modules</Link>
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

// Dynamic Troubleshooting Module Summary Loader
const DynamicTroubleshootingModuleSummary = () => {
  const { moduleId } = useParams();
  const summaryData = troubleshootingSummaryMap[moduleId];
  if (!summaryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Summary Not Found</h1>
          <p className="text-gray-600 mb-8">This module summary hasn't been created yet.</p>
          <Link to="/troubleshooting" className="text-orange-600 hover:text-orange-700 font-semibold">← Back to Modules</Link>
        </div>
      </div>
    );
  }
  return <ModuleSummary data={summaryData} backLink="/troubleshooting" />;
};

// Dynamic Troubleshooting Module Quiz Loader
const DynamicTroubleshootingModuleQuiz = () => {
  const { moduleId } = useParams();
  const quizData = troubleshootingQuizMap[moduleId];
  const moduleInfo = troubleshootingModulesData.find((m) => m.id === moduleId);
  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Not Found</h1>
          <p className="text-gray-600 mb-8">This module quiz hasn't been created yet.</p>
          <Link to="/troubleshooting" className="text-orange-600 hover:text-orange-700 font-semibold">← Back to Modules</Link>
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

// Dynamic Data Security Module Summary Loader
const DynamicDataSecurityModuleSummary = () => {
  const { moduleId } = useParams();
  const summaryData = dataSecuritySummaryMap[moduleId];
  if (!summaryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Summary Not Found</h1>
          <p className="text-gray-600 mb-8">This module summary hasn't been created yet.</p>
          <Link to="/data-security" className="text-rose-600 hover:text-rose-700 font-semibold">← Back to Modules</Link>
        </div>
      </div>
    );
  }
  return <ModuleSummary data={summaryData} backLink="/data-security" />;
};

// Dynamic Data Security Module Quiz Loader
const DynamicDataSecurityModuleQuiz = () => {
  const { moduleId } = useParams();
  const quizData = dataSecurityQuizMap[moduleId];
  const moduleInfo = dataSecurityModulesData.find((m) => m.id === moduleId);
  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Not Found</h1>
          <p className="text-gray-600 mb-8">This module quiz hasn't been created yet.</p>
          <Link to="/data-security" className="text-rose-600 hover:text-rose-700 font-semibold">← Back to Modules</Link>
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home - Course Selection */}
        <Route path="/" element={<CourseHome />} />

        {/* CCNA Course */}
        <Route path="/ccna" element={<CCNAModules />} />
        <Route path="/ccna/:moduleId/summary" element={<DynamicCCNAModuleSummary />} />
        <Route path="/ccna/:moduleId/quiz" element={<DynamicCCNAModuleQuiz />} />
        <Route path="/ccna/:checkpointId/quiz" element={<DynamicCCNACheckpointQuiz />} />

        {/* IT Essentials Course */}
        <Route path="/it-essentials" element={<ITEssentialsModules />} />
        <Route path="/it-essentials/:moduleId/summary" element={<DynamicITEModuleSummary />} />
        <Route path="/it-essentials/:moduleId/quiz" element={<DynamicITEModuleQuiz />} />
        <Route path="/it-essentials/:checkpointId/quiz" element={<DynamicITECheckpointQuiz />} />

        {/* Computer Fundamentals Course */}
        <Route path="/comp-fundamentals" element={<CompFundamentals />} />
        <Route path="/comp-fundamentals/:moduleId/summary" element={<DynamicCompModuleSummary />} />
        <Route path="/comp-fundamentals/:moduleId/quiz" element={<DynamicCompModuleQuiz />} />
        <Route path="/comp-fundamentals/:checkpointId/quiz" element={<DynamicCompCheckpointQuiz />} />

        {/* Ethics Course */}
        <Route path="/ethics" element={<EthicsModules />} />
        <Route path="/ethics/:moduleId/summary" element={<DynamicEthicsModuleSummary />} />
        <Route path="/ethics/:moduleId/quiz" element={<DynamicEthicsModuleQuiz />} />
        <Route path="/ethics/:checkpointId/quiz" element={<DynamicEthicsCheckpointQuiz />} />

        {/* Troubleshooting Course */}
        <Route path="/troubleshooting" element={<TroubleshootingModules />} />
        <Route path="/troubleshooting/:moduleId/summary" element={<DynamicTroubleshootingModuleSummary />} />
        <Route path="/troubleshooting/:moduleId/quiz" element={<DynamicTroubleshootingModuleQuiz />} />

        {/* Data Security Course */}
        <Route path="/data-security" element={<DataSecurityModules />} />
        <Route path="/data-security/:moduleId/summary" element={<DynamicDataSecurityModuleSummary />} />
        <Route path="/data-security/:moduleId/quiz" element={<DynamicDataSecurityModuleQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
