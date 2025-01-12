import IMAGEPLACEHOLDER from "@/assets/placeholder.jpg";
import { getBadgeColor, processGoogleDriveLink } from "@/lib/utils";
import { QuizType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

// Define the props interface for ArticleCard
interface QuizCardProps {
  id: string;
  frontmatter: {
    title: string;
    description?: string;
    quizType: QuizType;
    image?: string;
    date: string;
  };
}

export default function QuizCard({ id, frontmatter }: QuizCardProps) {
  const formattedDate = new Date(frontmatter.date).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const imageUrl = processGoogleDriveLink(frontmatter.image || "");

  return (
    <Link
      href={id}
      className="rounded-xl flex flex-col items-start bg-white shadow-xl hover:outline hover:outline-coreBlue-500 hover:outline-offset-2 w-full"
    >
      {/* Image at the top */}
      <div className="w-full h-60 overflow-hidden rounded-t-lg bg-[#D9D9D9]">
        <Image
          src={imageUrl || IMAGEPLACEHOLDER}
          alt={frontmatter.title}
          className="w-full h-full object-cover"
          width={1280}
          height={720}
        />
      </div>

      {/* Text content below the image */}
      <div className="p-5 w-full flex flex-col gap-3 text-black">
        <h3 className="text-2xl font-semibold">{frontmatter.title}</h3>
        <time
          dateTime={frontmatter.date}
          className="text-sm text-gray-500"
        >
          {formattedDate}
        </time>
        {frontmatter.description && (
          <p className="text-sm text-gray-700">
            {frontmatter.description.slice(0, 100)}...
          </p>
        )}
        <span
          className={`text-xs font-medium rounded px-2 py-1 w-max ${getBadgeColor(frontmatter.quizType)}`}
        >
          {frontmatter.quizType}
        </span>
      </div>
    </Link>
  );
}
