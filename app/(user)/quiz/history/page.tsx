'use client'
import { useSessionContext } from '@/app/context/sessionContext';
import { Quiz } from '@prisma/client';
import { Check, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface History {
  id: string;
  quiz: Quiz;
  attempts: number;
  averageScore: number;
}

export default function page() {
  const [history, setHistory] = useState<History[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { session } = useSessionContext();

  const fetchhistory = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/quizzes/history`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }

      const { success, data } = await response.json();
      if (success) {
        setHistory(data);
      } else {
        throw new Error("Invalid response");
      }
    } catch (err: any) {
      console.log(err);
      toast.error("Failed to load history.");  
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchhistory();
  }, []);
  return (
    <div>
      <div className="w-full min-h-screen flex flex-col items-center  py-8 px-4 bg-gray-50">
        <div className="mx-auto container py-32 flex flex-col gap-8 justify-center items-center">
          <h1 className="text-center text-3xl lg:text-6xl font-bold text-black">
            Quiz & Latihan
          </h1>
          <div className="flex gap-4 w-full max-w-3xl">
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center items-center mt-8">
              <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          )}

          {!loading && (
            <div className="grid gap-3 mt-8 px-5 w-full">
              {history.length > 0 ? (
                history.map(({ id, quiz, attempts, averageScore }: History) => (
                  <div
                    key={id}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2"
                  >
                    <h2 className="text-lg font-semibold text-blue-600">
                      {quiz.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {quiz.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 flex items-center">
                        <Check className="w-4 h-4 mr-1" />
                        Jumlah percobaan: {attempts}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Rata-rata skor: {averageScore}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  Tidak ada quiz yang ditemukan.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
