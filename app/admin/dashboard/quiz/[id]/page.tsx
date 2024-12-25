import { FC } from 'react';
import { QUESTIONS } from '../data/questions';
import { QUIZZES } from '../data/quizzes';
import { notFound } from 'next/navigation';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '../components/questionColumns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getBadgeColor } from '../lib/utils';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import AddQuestionButton from './components/addQuestionButton';

interface PageProps {
    params: Promise<{ id: string }>
}

const Page: FC<PageProps> = async ({ params }) => {
    const { id } = await params;

    const existingQuiz = QUIZZES.find(quiz => quiz.id === id);
    if (!existingQuiz) return notFound();
    if (!existingQuiz) return notFound();

    const questions = QUESTIONS.filter(question => question.quizId === id);

    return (
        <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>
            <h3 className='text-3xl font-semibold'>Quiz Detail</h3>
            <div className='grid grid-cols-2 items-center'>
                <div className='space-y-2'>
                    <h4 className='text-xl font-semibold'>{existingQuiz.title}</h4>
                    {existingQuiz.image && <img src={existingQuiz.image} alt="" />}
                    <p>{existingQuiz.description}</p>

                </div>
                <div className='flex flex-col gap-2 items-end justify-end'>
                    <Badge variant={'outline'} className={cn(getBadgeColor(existingQuiz.type))}>{existingQuiz.type}</Badge>
                    <p className='text-slate-500'>By: {existingQuiz.author}</p>
                </div>

            </div>

            <div className='flex flex-col gap-2 mt-10'>
                <h3 className="font-semibold text-xl">Questions</h3>
                <div className="grid grid-cols-2">
                    <AddQuestionButton quizId={id} />
                    <div className="flex justify-end">
                        <Input className="max-w-[15rem]" type="text" name="search" placeholder="Search..." />
                    </div>
                </div>
            </div>

            <DataTable columns={columns} data={questions} />
            <Link className='hover:underline flex items-center' href={'/admin/dashboard/quiz'}>
                <ChevronLeft size={20} />
                Back
            </Link>
        </div>
    )
}

export default Page;