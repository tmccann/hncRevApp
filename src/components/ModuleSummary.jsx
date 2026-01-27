import React from "react";
import { Link, useParams } from "react-router-dom";

const ModuleSummary = ({ summaryData }) => {
  const { courseId, moduleId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to={`/${courseId}`}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to Modules
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Module {summaryData.number}
            </span>
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
              📝 Summary
            </span>
          </div>
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">
            {summaryData.title}
          </h1>
          <p className="text-gray-600">{summaryData.description}</p>
        </div>

        {/* Key Concepts */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>💡</span> Key Concepts
          </h2>
          <div className="space-y-4">
            {summaryData.keyConcepts.map((concept, index) => (
              <div
                key={index}
                className="border-l-4 border-indigo-500 pl-4 py-2"
              >
                <h3 className="font-bold text-gray-800 mb-1">
                  {concept.title}
                </h3>
                <p className="text-gray-600 text-sm">{concept.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Points */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>⭐</span> Important Points to Remember
          </h2>
          <ul className="space-y-3">
            {summaryData.importantPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold mt-1">•</span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Reference */}
        {summaryData.quickReference && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>📋</span> Quick Reference
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              {summaryData.quickReference.map((ref, index) => (
                <div key={index} className="mb-2">
                  <span className="text-indigo-600 font-semibold">
                    {ref.label}:
                  </span>{" "}
                  <span className="text-gray-700">{ref.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            to={`/${courseId}/${moduleId}/quiz`}
            className="flex-1 bg-indigo-600 text-white text-center py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            📊 Take Module Quiz
          </Link>
          <Link
            to={`/${courseId}`}
            className="flex-1 bg-gray-200 text-gray-700 text-center py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Back to Modules
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModuleSummary;
