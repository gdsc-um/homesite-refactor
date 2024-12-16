import fs from "fs/promises";
import ArticleCard from "@/components/ArticleCard";

export default async function QuizPage() {
  // Read quizzes directory asynchronously
  const files = await fs.readdir("quizzes");
  const quizzes = await Promise.all(
    files.map(async (fileName) => {
      const slug = fileName.replace(".json", "");
      const fileContent = await fs.readFile(`quizzes/${fileName}`, "utf-8");
      const { metadata } = JSON.parse(fileContent);
      return { slug, metadata };
    })
  );

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="mx-auto container py-32 flex flex-col gap-8 justify-center items-center">
        <h1 className="text-center text-3xl lg:text-6xl font-bold text-black">
          Quiz & Latihan
        </h1>
        <div className="grid lg:grid-cols-3 gap-3 mt-8 px-5">
          {quizzes.map(({ slug, metadata }) => (
            <ArticleCard
              slug={`/quiz/${slug}`}
              frontmatter={metadata}
              key={slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Daftar Quiz | GDSC Universitas Negeri Malang",
  description: "Daftar quiz yang disediakan oleh GDSC UM",
};
