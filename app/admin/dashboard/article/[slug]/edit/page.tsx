"use client"; // Add this directive to mark the file as a client component

import React, { FC, useEffect, useState } from 'react';
import { ARTICLES } from '../../data/articles';
import { notFound } from 'next/navigation';
import ArticleForm from '../../components/articleForm';

// Define the structure of an Article, including all necessary fields
interface Article {
  id: string;
  title: string;
  content: string;
  author: string;  // Add missing fields
  date: string;
  image: string;
}

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

const EditArticlePage: FC<EditArticlePageProps> = ({ params }) => {
  const [article, setArticle] = useState<Article | null>(null); // Updated to the Article type
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [id, setId] = useState<string | null>(null); // Store the article id

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      const existingArticle = ARTICLES.find((article) => article.id === id);
      if (!existingArticle) {
        notFound(); // If no article is found, navigate to 404
      } else {
        setArticle(existingArticle);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (!article) {
    return <div>Article not found</div>; // If article is not found, display a message
  }

  return (
    <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>
      <h3 className='text-3xl font-semibold'>Edit Article</h3>
      <ArticleForm type="EDIT" article={article} />
    </div>
  );
};

export default EditArticlePage;
