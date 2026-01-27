import React from "react";
import { Link } from "react-router-dom";

const CourseHome = () => {
  const courses = [
    {
      id: "ccna",
      title: "CCNA: Introduction to Networks",
      description:
        "Cisco Certified Network Associate certification preparation",
      modules: 17,
      quizzes: 45,
      progress: 5, // You can track this later
      color: "from-blue-500 to-cyan-600",
      icon: "🌐",
    },
    {
      id: "it-essentials",
      title: "IT Essentials 8",
      description: "PC Hardware and Software fundamentals",
      modules: 14,
      quizzes: 38,
      progress: 0,
      color: "from-purple-500 to-pink-600",
      icon: "💻",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-600 mb-4">
            Cisco Learning Platform
          </h1>
          <p className="text-xl text-gray-600">
            Choose your course to begin studying
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/${course.id}`}
              className="block bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {/* Card Header */}
              <div
                className={`bg-gradient-to-r ${course.color} p-8 text-white`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl">{course.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold">{course.title}</h2>
                    <p className="text-indigo-100 text-sm mt-1">
                      {course.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-indigo-600">
                      {course.modules}
                    </div>
                    <div className="text-sm text-gray-600">Modules</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">
                      {course.quizzes}
                    </div>
                    <div className="text-sm text-gray-600">Quizzes</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`bg-gradient-to-r ${course.color} h-3 rounded-full transition-all duration-300`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Enter Button */}
                <div className="text-center py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Enter Course →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Comprehensive Study
            </h3>
            <p className="text-gray-600 text-sm">
              Summaries and quizzes for every module
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Checkpoint Quizzes
            </h3>
            <p className="text-gray-600 text-sm">
              Combined assessments across modules
            </p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Track Progress
            </h3>
            <p className="text-gray-600 text-sm">
              Monitor your learning journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;
