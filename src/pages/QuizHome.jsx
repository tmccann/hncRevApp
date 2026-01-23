import React from "react";
import { Link } from "react-router-dom";

const QuizHome = () => {
  const quizzes = [
    {
      id: "ccna-transport",
      title: "CCNA: Transport & Application Layer",
      description:
        "Test your knowledge of TCP/UDP, port numbers, and application layer protocols",
      questions: 61,
      topics: ["TCP", "UDP", "Application Protocols", "Port Numbers"],
      difficulty: "Intermediate",
      color: "from-indigo-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-600 mb-4">
            CCNA Quiz Platform
          </h1>
          <p className="text-xl text-gray-600">
            Master your CCNA certification with interactive quizzes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className={`bg-gradient-to-r ${quiz.color} p-6 text-white`}>
                <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
                <p className="text-indigo-100 text-sm">{quiz.description}</p>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{quiz.questions}</span>
                    <span>Questions</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <div className="flex items-center gap-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        quiz.difficulty === "Beginner"
                          ? "bg-green-100 text-green-700"
                          : quiz.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {quiz.difficulty}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-500 mb-2">
                    TOPICS COVERED:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quiz.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/${quiz.id}`}
                  className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Start Quiz →
                </Link>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden opacity-60">
            <div className="bg-gradient-to-r from-gray-400 to-gray-500 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">More Quizzes</h2>
              <p className="text-gray-100 text-sm">
                Additional topics coming soon
              </p>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">?</span>
                  <span>Questions</span>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  COMING SOON:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    Network Fundamentals
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    Routing & Switching
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    IP Addressing
                  </span>
                </div>
              </div>
              <button
                disabled
                className="block w-full bg-gray-300 text-gray-500 text-center py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Active Recall
            </h3>
            <p className="text-gray-600 text-sm">
              Question-based learning optimized for retention and exam
              preparation
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Track Progress
            </h3>
            <p className="text-gray-600 text-sm">
              Monitor your score and review answers to improve understanding
            </p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💡</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Detailed Explanations
            </h3>
            <p className="text-gray-600 text-sm">
              Learn from comprehensive explanations for every question
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHome;
