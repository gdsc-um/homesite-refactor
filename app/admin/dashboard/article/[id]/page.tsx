import { FC } from 'react';
import { ARTICLES } from '../data/articles';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page: FC<PageProps> = async ({ params }) => {
  const { id } = await params;

  const existingArticle = ARTICLES.find(article => article.id === id);
  if (!existingArticle) return notFound();

  return (
    <div className="px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-8">
      {/* Header Artikel */}
      <div className="flex flex-col items-center text-center gap-4">
        <h3 className="text-3xl font-semibold">{existingArticle.title}</h3>
        <p className="text-slate-500 text-sm">By: {existingArticle.author}</p>
        {existingArticle.image && (
          <img
            src={existingArticle.image}
            alt={existingArticle.title}
            className="w-[300px] h-auto rounded-md shadow-md"
          />
        )}
        <Badge variant="outline" className="text-sm">
          {new Date(existingArticle.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Badge>
      </div>

      {/* Konten Artikel */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xl font-semibold">Content</h4>
        <p className="text-justify text-slate-700 leading-relaxed">
          {existingArticle.content}
        </p>
      </div>

      {/* Tombol Kembali */}
      <Link
        className="hover:underline flex items-center mt-6"
        href={'/admin/dashboard/article'}
      >
        <ChevronLeft size={20} />
        Back
      </Link>
    </div>
  );
};

export default Page;
