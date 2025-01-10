"use client";

import React, { FC, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import ArticleForm from '../../components/articleForm';
import { Article } from '@prisma/client';

interface EditArticlePageProps {
  params: Promise<{ slug: string }>; // Mengubah menjadi Promise yang harus dibongkar
}

const EditArticlePage: FC<EditArticlePageProps> = ({ params }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Membongkar promise params menggunakan use() untuk mendapatkan slug
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      const response = await fetch(`/api/article/${slug}`);
      const articleData = await response.json();
      
      if (!articleData) return notFound();
      
      setArticle(articleData);
      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4">
      <h3 className="text-3xl font-semibold">Edit Article</h3>
      <ArticleForm type="EDIT" article={article} />
    </div>
  );
};

export default EditArticlePage;
