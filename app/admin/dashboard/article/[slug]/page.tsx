import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

const prisma = new PrismaClient();

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // Fetch artikel dari database
  const existingArticle = await prisma.article.findUnique({
    where: { slug },
  });

  if (!existingArticle) return notFound();

  return (
    <div className="px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center gap-4">
        
      <Image
            src="/banner.png"
            // src={`https://drive.google.com/uc?id=1T2A6rV-IejAqrVZpAMpeL9PjP_RZG-1L`}
            alt={"banner"}
            width={600}
            height={300}
            className="rounded-md shadow-md"
        />
        <h3 className="text-3xl font-semibold">{existingArticle.title}</h3>
        <div className="flex flex-col items-start text-start gap-2">
          <Badge variant="outline" className="text-sm">
            {existingArticle.date?.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Badge>
          <p className="text-slate-500 text-sm">By: {existingArticle.author}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4">
        <p
          className="text-justify text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: existingArticle.content.replace(/\n/g, '<br />'),
          }}
        />
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
