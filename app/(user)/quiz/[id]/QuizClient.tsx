"use client";

import React from "react";
import { toast } from "react-hot-toast";

interface Option {
  answer: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  question: string;
  answer: {
    options: Option[];
  };
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

interface QuizClientProps {
  quizData: Quiz;
}

const QuizClient: React.FC<QuizClientProps> = ({ quizData }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const [score, setScore] = React.useState<number>(0);
  const [showScore, setShowScore] = React.useState<boolean>(false);
  const [startTime, setStartTime] = React.useState<Date | null>(null);
  const [endTime, setEndTime] = React.useState<Date | null>(null);

  // Start timer when quiz is initiated
  React.useEffect(() => {
    if (!startTime) {
      setStartTime(new Date());
    }
  }, [startTime]);

  const handleQuestion = (selectedOption: Option) => {
    const correct = selectedOption.isCorrect;
    const newScore = correct ? score + 1 : score;
    setScore(newScore);

    if (currentQuestion + 1 === quizData.questions.length) {
      setEndTime(new Date());
      setShowScore(true);
      saveResult(newScore);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const saveResult = async (currentScore: number) => {
    console.log("Saving result...");

    let adjustedScore = currentScore / quizData.questions.length;
    adjustedScore = Math.round(adjustedScore * 100);
    console.log("Raw score:", currentScore);
    console.log("Adjusted score:", adjustedScore);

    const result = {
      score: adjustedScore,
      timestamp: new Date(),
    };

    try {
      console.log("Submitting quiz result...", quizData.id);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/quizzes/${quizData.id}/submit`, {
        method: "POST",
        body: JSON.stringify(result),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Quiz result submitted successfully!");
      } else {
        const err = await response.json();
        toast.error(err.error || "Failed to submit quiz result.");
      }
    } catch (error: any) {
      console.log("Error submitting quiz result:", error);
      toast.error("An unexpected error occurred while submitting the quiz result.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-8 px-4 bg-gray-50">
      {showScore ? (
        <div className="flex flex-col items-center w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-blue-600 mb-4">
            Your Score: {score} / {quizData.questions.length}
          </h1>
          <p className="text-xl text-gray-700">
            {score === quizData.questions.length
              ? "Perfect score! Great job!"
              : `You scored ${score} out of ${quizData.questions.length}`}
          </p>
          <p className="text-xl text-gray-700">
            Time Taken:{" "}
            {endTime && startTime
              ? ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2)
              : "N/A"}{" "}
            seconds
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Retry Quiz
          </button>

          <button
            onClick={() => window.location.href = "/quiz"}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          > 
            Back to Quiz
          </button>

        </div>
      ) : (
        <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-6">{quizData.title}</h1>
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">
              {quizData.questions[currentQuestion].question}
            </h2>
            <div className="mt-4 space-y-3">
              {quizData.questions[currentQuestion].answer.options.map(
                (option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestion(option)}
                    className="w-full py-2 px-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 transition-all"
                  >
                    {option.answer}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="text-center mt-6">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {quizData.questions.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizClient;
