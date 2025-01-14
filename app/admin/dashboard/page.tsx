"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function Dashboard() {
  const { data: session, status } = useSession();
  const [counts, setCounts] = useState({
    userCount: 0,
    articleCount: 0,
    quizCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return; // Wait until the session is loaded

    async function fetchCounts() {
      try {
        const response = await fetch("/api/dashboard");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCounts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    // Proceed to fetch data only if session is available
    if (session) {
      fetchCounts();
    } else {
      setLoading(false);
      setError("Session not available");
    }
  }, [session, status]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 font-semibold">Error: {error}</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {counts.userCount}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Articles</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {counts.articleCount}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Quizzes</h2>
          <p className="text-4xl font-bold text-purple-600 mt-2">
            {counts.quizCount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
