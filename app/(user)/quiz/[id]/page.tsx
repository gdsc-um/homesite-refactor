import { UUID } from 'crypto';
import fs from 'fs/promises';
import React from 'react';





interface QuizPageProps {
  params: Promise<{ id: UUID }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const resolvedParams = await params; 
  const { id } = resolvedParams;

  // Mengambil data quiz dari file
  const fileContent = await fs.readFile(`quizzes/${id}.json`, 'utf8');
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
