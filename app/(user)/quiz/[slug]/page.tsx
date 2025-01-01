import fs from 'fs/promises';
import React from 'react';

// Fungsi generateStaticParams hanya digunakan di Server Component
export async function generateStaticParams() {
  const files = await fs.readdir('quizzes');
  return files.map(fileName => ({
    slug: fileName.replace('.json', ''),
  }));
}

interface QuizParams {
  params: {
    slug: string;
  };
}

export default async function QuizPage({ params }: QuizParams) {
  const { slug } = params;
  // Mengambil data quiz dari file
  const fileContent = await fs.readFile(`quizzes/${slug}.json`, 'utf8');
  const quizData = JSON.parse(fileContent);

  // Memuat komponen klien secara dinamis
  const QuizClient = React.lazy(() => import('./QuizClient'));

  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <QuizClient quizData={quizData} />
      </React.Suspense>
    </div>
  );
}
