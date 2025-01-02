import { notFound } from 'next/navigation';
import { ARTICLES } from '../data/articles';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ id: string }>; // Define params as a Promise type
}

export default async function Page({ params }: PageProps) {
  const { id } = await params; // Await the resolution of params

  // Simulate async fetching of articles (e.g., replace with an actual API call)
  const existingArticle = ARTICLES.find(article => article.id === id);
  if (!existingArticle) return notFound();

  return (
    <div className="px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center gap-4">
        <h3 className="text-3xl font-semibold">{existingArticle.title}</h3>
        <p className="text-slate-500 text-sm">By: {existingArticle.author}</p>
        {existingArticle.image && (
          <Image
            src={existingArticle.image}
            alt={existingArticle.title}
            width={300}
            height={200}
            className="rounded-md shadow-md"
          />
        )}
        <Badge variant="outline" className="text-sm">
          {new Date(existingArticle.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Badge>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xl font-semibold">Content</h4>
        <p className="text-justify text-slate-700 leading-relaxed">
          {existingArticle.content}
        </p>
      </div>

      {/* Back Button */}
      <Link
        className="hover:underline flex items-center mt-6"
        href="/admin/dashboard/article"
      >
        <ChevronLeft size={20} />
        Back
      </Link>
    </div>
  );
}
