import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function generateStaticParams() {
  const files = await fs.readdir("quizzes");
  return files.map((fileName) => ({
    slug: fileName.replace(".json", ""),
  }));
}

export default async function Quiz({ params: { slug } }) {
  const fileContent = await fs.readFile(`quizzes/${slug}.json`, "utf8");
  const quizData = JSON.parse(fileContent);

  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);

  const [answers, setAnswers] = React.useState([]);
  const [startTime, setStartTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState(0);
  const [sessionUUID, setSessionUUID] = React.useState(uuidv4());

  React.useEffect(() => {
    if (startTime === 0) {
      setStartTime(new Date());
    }
  }, []);

  const handleQuestion = (answer) => {
    let correct = answer.isCorrect;
    setScore((prevScore) => (correct ? prevScore + 1 : prevScore));
    answers.push({
      question: quizData.questions[currentQuestion].question,
      userAnswer: answer.answer,
      correctAnswer: quizData.questions[currentQuestion].options.find(
        (option) => option.isCorrect
      ).answer,
      correct,
      timestamp: new Date().toISOString(),
    });

    if (currentQuestion + 1 === quizData.questions.length) {
      setEndTime(new Date());
      setShowScore(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full min-h-screen">
      {showScore ? (
        <div className="flex justify-center items-center w-full min-h-screen">
          <h1 className="text-3xl font-semibold">
            You scored {score} out of {quizData.questions.length}
          </h1>
        </div>
      ) : (
        <>
          <h1 className="text-2xl">{quizData.metadata.title}</h1>
          <div>
            <h2>{quizData.questions[currentQuestion].question}</h2>
            {quizData.questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleQuestion(option)}>
                {option.answer}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export const metadata = ({ params }) => ({
  title: `${params.slug} | Quiz`,
  description: "Detail halaman quiz",
});
