"use client";
import { Quiz } from "@prisma/client";
import ArticleCard from "@/components/ArticleCard";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";  // Import toast
import { useSessionContext } from "@/app/context/sessionContext";

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoading, session } = useSessionContext() 
  const user = session?.user;

  const fetchQuizzes = async (query: string = "") => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/quizzes?search=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }

      const { success, data } = await response.json();
      if (success) {
        setQuizzes(data);
      } else {
        throw new Error("Invalid response");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load quizzes.");  // Show error toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleSearch = () => {
    fetchQuizzes(searchQuery);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="mx-auto container py-32 flex flex-col gap-8 justify-center items-center">
        <h1 className="text-center text-3xl lg:text-6xl font-bold text-black">
          Quiz & Latihan
        </h1>
        <div className="flex gap-4 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Cari quiz..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Cari
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center mt-8">
            <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {/* Quiz List or No Data Message */}
        {!loading && (
          <div className="grid lg:grid-cols-3 gap-3 mt-8 px-5 w-full">
            {quizzes.length > 0 ? (
              quizzes.map(({ id, title, content, quizType, image, createdAt }: Quiz) => (
                <ArticleCard
                  id={`/quiz/${id}`}
                  frontmatter={{
                    title,
                    description: content,
                    quizType: quizType,
                    image: image ?? "https://via.placeholder.com/150",
                    date: new Date(createdAt).toISOString(),
                  }}
                  key={id}
                />
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
  );
}
