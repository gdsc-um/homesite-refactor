import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

const prisma = new PrismaClient();

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  // Fetch artikel dari database
  const existingArticle = await prisma.article.findUnique({
    where: { slug },
  });

  if (!existingArticle) return notFound();

  return (
    <div className="px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center gap-4">
        <h3 className="text-3xl font-semibold">{existingArticle.title}</h3>
        <p className="text-slate-500 text-sm">By: {existingArticle.author}</p>
        {existingArticle.banner && (
          // https://drive.google.com/file/d/1T2A6rV-IejAqrVZpAMpeL9PjP_RZG-1L
          <Image
            src={`https://drive.google.com/uc?id=${existingArticle.banner}`}
            // src={`https://drive.google.com/uc?id=1T2A6rV-IejAqrVZpAMpeL9PjP_RZG-1L`}
            alt={existingArticle.title}
            width={600}
            height={300}
            className="rounded-md shadow-md"
          />
        )}
        <Badge variant="outline" className="text-sm">
          {new Date(existingArticle.createdAt).toLocaleDateString('en-US', {
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
