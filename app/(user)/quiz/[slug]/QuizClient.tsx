'use client';

import React from 'react';

interface Answer {
  answer: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  options: Answer[];
}

interface QuizData {
  metadata: {
    title: string;
  };
  questions: Question[];
}

interface QuizClientProps {
  quizData: QuizData;
}

const QuizClient: React.FC<QuizClientProps> = ({ quizData }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const [score, setScore] = React.useState<number>(0);
  const [showScore, setShowScore] = React.useState<boolean>(false);
  const [startTime, setStartTime] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (!startTime) {
      setStartTime(new Date());
    }
  }, [startTime]);

  const handleQuestion = (answer: Answer) => {
    const correct = answer.isCorrect;
    setScore(prevScore => (correct ? prevScore + 1 : prevScore));

    if (currentQuestion + 1 === quizData.questions.length) {
      setShowScore(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
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
              ? 'Perfect score! Great job!'
              : `You scored ${score} out of ${quizData.questions.length}`}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Retry Quiz
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-6">{quizData.metadata.title}</h1>
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-800">{quizData.questions[currentQuestion].question}</h2>
            <div className="mt-4 space-y-3">
              {quizData.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestion(option)}
                  className="w-full py-2 px-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 transition-all"
                >
                  {option.answer}
                </button>
              ))}
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
