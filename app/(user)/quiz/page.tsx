import fs from "fs/promises";
import ArticleCard from "@/components/ArticleCard";

// Define a more specific type for metadata
interface Metadata {
  title: string;
  description?: string;
  date: string; // Change to non-optional string
  tags: string[]; // Ensure tags is always a string array, no longer optional
}

interface Quiz {
  slug: string;
  metadata: Metadata; // Use the specific type for metadata
}

export default async function QuizPage() {
  // Read quizzes directory asynchronously
  const files = await fs.readdir("quizzes");

  // Read each file and parse the metadata with type safety
  const quizzes: Quiz[] = await Promise.all(
    files.map(async (fileName) => {
      const slug = fileName.replace(".json", "");
      const fileContent = await fs.readFile(`quizzes/${fileName}`, "utf-8");
      const { metadata } = JSON.parse(fileContent);

      // Ensure tags is always an array (empty array if not provided)
      const tags = metadata.tags ?? []; // Use empty array if undefined

      // Provide a default value for date if it's undefined
      const date = metadata.date ?? "Tanggal tidak tersedia"; // Default value for date

      // Return the quiz object with tags and date ensured
      return { slug, metadata: { ...metadata, tags, date } };
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
