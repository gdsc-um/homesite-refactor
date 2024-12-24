"use client";

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


interface ArticleFormProps {
  type: 'ADD' | 'EDIT';
  article?: {
    id: string;
    title: string;
    author: string;
    date: string;
    content: string;
  };
}

const ArticleForm: FC<ArticleFormProps> = ({ type, article }) => {
  const router = useRouter();
  const [title, setTitle] = useState(article?.title || '');
  const [author, setAuthor] = useState(article?.author || '');
  const [content, setContent] = useState(article?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to save the article
    const date = new Date().toISOString().split('T')[0];
    console.log({ title, author, date, content });
    router.push('/admin/dashboard/article');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <Button type="submit" className="px-4 py-2">
          {type === 'ADD' ? 'Add Article' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
};

export default ArticleForm;
