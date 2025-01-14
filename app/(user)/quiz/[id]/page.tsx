"use client";
import { useParams } from 'next/navigation';
import React from 'react';
import CryptoJS from 'crypto-js'; 


const decryptData = (encryptedData: string) => {
  const secret = process.env.NEXT_PUBLIC_QUIZ_SECRET;
  if (!secret) {
    throw new Error('QUIZ_SECRET is not defined');
  }
  const bytes = CryptoJS.AES.decrypt(encryptedData, secret);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData); 
};

export default function QuizPage() {
  const [quizData, setQuizData] = React.useState(null);
  const params = useParams();
  const id = params?.id as string;

  React.useEffect(() => {
    async function fetchQuizData() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/quizzes/${id}`);
      const { data } = await response.json(); 
      if (data) {
        const decryptedQuiz = decryptData(data);
        setQuizData(decryptedQuiz); 
      } else {
        console.error('Failed to fetch quiz data');
      }
    }

    fetchQuizData();
  }, [id]);

  if (!quizData) {
    return <div>Loading...</div>; // TODO add loading spinner
  }

  // Load client-side component dynamically
  const QuizClient = React.lazy(() => import('./QuizClient'));

  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <QuizClient quizData={quizData} />
      </React.Suspense>
    </div>
  );
}
