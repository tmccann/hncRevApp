import React, { useState } from "react";
import { Link } from "react-router-dom";

const Quiz = ({ questions, title, description }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showJumpMenu, setShowJumpMenu] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const getIsAnswered = () => {
    const selected = selectedAnswers[currentQuestion.id];

    if (currentQuestion.type === "matching") {
      if (!selected) return false;
      // Check if all Column A items have been matched (not all Column B - some may be unused)
      const matches = Object.values(selected).filter(
        (match) => match?.a,
      ).length;
      return matches === currentQuestion.columnA.length;
    }

    if (!selected || selected.length === 0) return false;

    if (currentQuestion.type === "multiple") {
      return selected.length === currentQuestion.correctAnswer.length;
    }

    return true;
  };

  const isAnswered = getIsAnswered();
  const isSubmitted = submittedAnswers[currentQuestion.id] !== undefined;

  const handleAnswerSelect = (optionId) => {
    if (isSubmitted) return;

    if (currentQuestion.type === "single") {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion.id]: [optionId],
      });
    } else if (currentQuestion.type === "multiple") {
      const current = selectedAnswers[currentQuestion.id] || [];
      const maxSelections = currentQuestion.correctAnswer.length;

      // If clicking an already selected option, unselect it
      if (current.includes(optionId)) {
        const newSelection = current.filter((id) => id !== optionId);
        setSelectedAnswers({
          ...selectedAnswers,
          [currentQuestion.id]: newSelection,
        });
      }
      // Only allow selection if we haven't reached the max
      else if (current.length < maxSelections) {
        const newSelection = [...current, optionId];
        setSelectedAnswers({
          ...selectedAnswers,
          [currentQuestion.id]: newSelection,
        });
      }
    }
  };

  //
  const handleSubmit = () => {
    const selected = selectedAnswers[currentQuestion.id];

    // Handle matching questions
    if (currentQuestion.type === "matching") {
      if (!selected) return;

      const correctMatches = currentQuestion.correctMatches;
      const userMatches = selected;

      // Check if all matches are correct
      const isCorrect = correctMatches.every(
        (match) => userMatches[match.b]?.a === match.a,
      );

      setSubmittedAnswers({
        ...submittedAnswers,
        [currentQuestion.id]: {
          userAnswer: userMatches,
          isCorrect,
        },
      });

      if (isCorrect) {
        setScore(score + 1);
      }
      return;
    }

    // Handle single/multiple choice questions
    if (!selected || selected.length === 0) return;

    const userAnswer = selected;
    const correctAnswer = currentQuestion.correctAnswer;

    const isCorrect =
      userAnswer.length === correctAnswer.length &&
      userAnswer.every((ans) => correctAnswer.includes(ans));

    setSubmittedAnswers({
      ...submittedAnswers,
      [currentQuestion.id]: {
        userAnswer,
        isCorrect,
      },
    });

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleTryAgain = () => {
    const wasCorrect = submittedAnswers[currentQuestion.id]?.isCorrect;

    const newSelectedAnswers = { ...selectedAnswers };
    delete newSelectedAnswers[currentQuestion.id];
    setSelectedAnswers(newSelectedAnswers);

    const newSubmittedAnswers = { ...submittedAnswers };
    delete newSubmittedAnswers[currentQuestion.id];
    setSubmittedAnswers(newSubmittedAnswers);

    if (wasCorrect) {
      setScore(score - 1);
    }
  };

  const handleNext = () => {
    // Auto-submit if answered but not yet submitted
    if (isAnswered && !isSubmitted) {
      handleSubmit();
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setShowJumpMenu(false);
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setScore(0);
    setShowResults(false);
  };

  const getAnswerStyle = (optionId) => {
    if (!isSubmitted) {
      const isSelected =
        selectedAnswers[currentQuestion.id]?.includes(optionId);
      return isSelected
        ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500"
        : "border-gray-300 hover:border-indigo-300";
    }

    const userAnswer = submittedAnswers[currentQuestion.id].userAnswer;
    const isUserSelection = userAnswer.includes(optionId);
    const isCorrectAnswer = currentQuestion.correctAnswer.includes(optionId);

    if (isCorrectAnswer) {
      return "border-green-500 bg-green-50 ring-2 ring-green-500";
    } else if (isUserSelection && !isCorrectAnswer) {
      return "border-red-500 bg-red-50 ring-2 ring-red-500";
    }
    return "border-gray-300 bg-gray-50";
  };

  const getChoiceText = () => {
    const count = currentQuestion.correctAnswer.length;
    if (currentQuestion.type === "multiple") {
      return count === 2
        ? "(Choose two)"
        : count === 3
          ? "(Choose three)"
          : `(Choose ${count})`;
    }
    return "";
  };

  if (showResults) {
    const percentage = ((score / totalQuestions) * 100).toFixed(1);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-indigo-600 mb-2">
                Quiz Complete!
              </h1>
              <p className="text-gray-600">Here are your results</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white text-center mb-8">
              <div className="text-6xl font-bold mb-2">{percentage}%</div>
              <div className="text-2xl mb-4">
                {score} out of {totalQuestions}
              </div>
              <div className="text-indigo-100">
                {percentage >= 90
                  ? "Excellent! 🎉"
                  : percentage >= 70
                    ? "Great job! 👍"
                    : percentage >= 50
                      ? "Good effort! 📚"
                      : "Keep practicing! 💪"}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleResetQuiz}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Retake Quiz
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestionIndex(0);
                }}
                className="w-full bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Review Answers
              </button>

              <Link to="/">Back to Quizzes</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-indigo-600">{title}</h1>
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
            <div className="text-sm font-semibold text-gray-600">
              Score: {score}/{Object.keys(submittedAnswers).length}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span>{progress.toFixed(0)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowJumpMenu(!showJumpMenu)}
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
            >
              {showJumpMenu ? "✕ Close Menu" : "⋮ Jump to Question"}
            </button>
            <Link to="/">Back to Quizzes</Link>
          </div>

          {showJumpMenu && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {questions.map((q, index) => {
                  const isAnswered = submittedAnswers[q.id] !== undefined;
                  const isCorrect = submittedAnswers[q.id]?.isCorrect;

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpToQuestion(index)}
                      className={`p-2 rounded font-semibold text-sm transition-colors ${
                        index === currentQuestionIndex
                          ? "bg-indigo-600 text-white"
                          : isAnswered
                            ? isCorrect
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Q{currentQuestionIndex + 1}
              </span>
              {currentQuestion.type === "multiple" && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {getChoiceText()}
                </span>
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {currentQuestion.text}
            </h2>
          </div>

          {currentQuestion.image && (
            <div className="mb-6">
              <img
                src={currentQuestion.image}
                alt={`Question ${currentQuestion.id} illustration`}
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
          {/* Matching Question Type - Click to Match */}
          {currentQuestion.type === "matching" && (
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Instructions:</strong> Click an item in Column A, then
                  click its match in Column B to create a connection.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Column A */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Column A</h3>
                  <div className="space-y-2">
                    {currentQuestion.columnA.map((item) => {
                      const isSelected =
                        selectedAnswers[currentQuestion.id]?.selectedA ===
                        item.id;
                      const isMatched =
                        selectedAnswers[currentQuestion.id] &&
                        Object.values(selectedAnswers[currentQuestion.id]).some(
                          (match) => match?.a === item.id,
                        );

                      let borderColor = "border-gray-300";
                      let bgColor = "bg-white";
                      let cursorStyle =
                        "cursor-pointer hover:border-indigo-400";

                      if (isSubmitted) {
                        cursorStyle = "cursor-not-allowed";
                        const matchedPair = Object.entries(
                          selectedAnswers[currentQuestion.id] || {},
                        ).find(([, match]) => match?.a === item.id);
                        if (matchedPair) {
                          const [bId] = matchedPair;
                          const correctMatch =
                            currentQuestion.correctMatches.find(
                              (m) => m.a === item.id,
                            );
                          const isCorrect = correctMatch?.b === bId;
                          borderColor = isCorrect
                            ? "border-green-500"
                            : "border-red-500";
                          bgColor = isCorrect ? "bg-green-50" : "bg-red-50";
                        }
                      } else {
                        if (isSelected) {
                          borderColor = "border-blue-500";
                          bgColor = "bg-blue-50";
                        } else if (isMatched) {
                          borderColor = "border-green-500";
                          bgColor = "bg-green-50";
                        }
                      }

                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (isSubmitted) return;
                            setSelectedAnswers({
                              ...selectedAnswers,
                              [currentQuestion.id]: {
                                ...(selectedAnswers[currentQuestion.id] || {}),
                                selectedA: item.id,
                              },
                            });
                          }}
                          className={`p-4 border-2 rounded-lg transition-all ${borderColor} ${bgColor} ${cursorStyle}`}
                        >
                          <span className="font-semibold text-indigo-600">
                            {item.id.toUpperCase()}:
                          </span>{" "}
                          {item.text}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Column B */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Column B</h3>
                  <div className="space-y-2">
                    {currentQuestion.columnB.map((item) => {
                      const matchedTo =
                        selectedAnswers[currentQuestion.id]?.[item.id];

                      let borderColor = "border-gray-300";
                      let bgColor = "bg-white";
                      let cursorStyle =
                        "cursor-pointer hover:border-indigo-400";

                      if (isSubmitted) {
                        cursorStyle = "cursor-not-allowed";
                        if (matchedTo) {
                          const correctMatch =
                            currentQuestion.correctMatches.find(
                              (m) => m.b === item.id,
                            );
                          const isCorrect = correctMatch?.a === matchedTo.a;
                          borderColor = isCorrect
                            ? "border-green-500"
                            : "border-red-500";
                          bgColor = isCorrect ? "bg-green-50" : "bg-red-50";
                        }
                      } else {
                        if (matchedTo) {
                          borderColor = "border-green-500";
                          bgColor = "bg-green-50";
                        }
                      }

                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (isSubmitted) return;
                            const selectedA =
                              selectedAnswers[currentQuestion.id]?.selectedA;
                            if (!selectedA) return;

                            const current =
                              selectedAnswers[currentQuestion.id] || {};
                            setSelectedAnswers({
                              ...selectedAnswers,
                              [currentQuestion.id]: {
                                ...current,
                                [item.id]: { a: selectedA, b: item.id },
                                selectedA: null,
                              },
                            });
                          }}
                          className={`p-4 border-2 rounded-lg transition-all ${borderColor} ${bgColor} ${cursorStyle} relative`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <span className="font-semibold text-indigo-600">
                                {item.id.toUpperCase()}:
                              </span>{" "}
                              {item.text}
                            </div>
                            {matchedTo && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-indigo-600 bg-white px-2 py-1 rounded border border-indigo-300">
                                  {matchedTo.a.toUpperCase()}
                                </span>
                                {isSubmitted && (
                                  <span className="text-lg">
                                    {(() => {
                                      const correctMatch =
                                        currentQuestion.correctMatches.find(
                                          (m) => m.b === item.id,
                                        );
                                      return correctMatch?.a === matchedTo.a
                                        ? "✓"
                                        : "✗";
                                    })()}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Single/Multiple Choice Questions */}
          {(currentQuestion.type === "single" ||
            currentQuestion.type === "multiple") && (
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswers[
                  currentQuestion.id
                ]?.includes(option.id);
                const inputType =
                  currentQuestion.type === "single" ? "radio" : "checkbox";
                return (
                  <div
                    key={`${currentQuestion.id}-${option.id}`}
                    onClick={() => handleAnswerSelect(option.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${getAnswerStyle(option.id)} ${
                      isSubmitted ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type={inputType}
                        name={`question-${currentQuestion.id}`}
                        checked={isSelected}
                        onChange={() => {}}
                        disabled={isSubmitted}
                        className="mt-1 w-4 h-4 text-indigo-600 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <span className="flex-1 text-gray-700">
                        <span className="font-semibold text-indigo-600">
                          {option.id.toUpperCase()}.
                        </span>{" "}
                        {option.text}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          )}

          {isSubmitted && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                submittedAnswers[currentQuestion.id].isCorrect
                  ? "bg-green-50 border-2 border-green-200"
                  : "bg-red-50 border-2 border-red-200"
              }`}
            >
              <div className="flex items-start gap-2 mb-2">
                <span className="text-lg">
                  {submittedAnswers[currentQuestion.id].isCorrect ? "✓" : "✗"}
                </span>
                <span
                  className={`font-semibold ${
                    submittedAnswers[currentQuestion.id].isCorrect
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {submittedAnswers[currentQuestion.id].isCorrect
                    ? "Correct!"
                    : "Incorrect"}
                </span>
              </div>
              <p className="text-gray-700 text-sm">
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={!isAnswered}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  isAnswered
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleTryAgain}
                className="flex-1 bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                currentQuestionIndex === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              {currentQuestionIndex === totalQuestions - 1
                ? "Finish Quiz"
                : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
