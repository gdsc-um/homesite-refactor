"use client";

import { FC, useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '../components/questionColumns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getBadgeColor } from '../lib/utils';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { QuizWithAllRelations } from '../lib/definition';
import AddQuestionButton from './components/addQuestionButton';

interface PageProps {

}

const Page: FC<PageProps> = () => {
    const [quiz, setQuiz] = useState<QuizWithAllRelations | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { id } = useParams();
    useEffect(() => {
        const fetchQuiz = async () => {
            const response = await fetch(`/api/quizzes/${id}`);
            if (response.status === 404) return notFound();
            const data = await response.json();
            setQuiz(data.data);
            setIsLoading(false);
        }
        fetchQuiz();
    }, [])


    return (
        <div className='px-6 py-4 max-w-[80rem] mx-auto flex flex-col gap-4'>
            <h3 className='text-3xl font-semibold'>Quiz Detail</h3>
            {!isLoading &&
                <>
                <div className='grid grid-cols-2 items-center'>
                    <div className='space-y-2'>
                        <h4 className='text-xl font-semibold'>{quiz?.title}</h4>
                        {quiz?.image && <img src={quiz?.image} alt="" />}
                        <p>{quiz?.content}</p>

                    </div>
                    <div className='flex flex-col gap-2 items-end justify-end'>
                        <Badge variant={'outline'} className={cn(getBadgeColor(quiz?.quizType!))}>{quiz?.quizType}</Badge>
                        <p className='text-slate-500'>By: {quiz?.author.name}</p>
                    </div>

                </div>

                <div className='flex flex-col gap-2 mt-10'>
                    <h3 className="font-semibold text-xl">Questions</h3>
                    <div className="grid grid-cols-2">
                        <AddQuestionButton quizId={id!} />
                        <div className="flex justify-end">
                            <Input className="max-w-[15rem]" type="text" name="search" placeholder="Search..." />
                        </div>
                    </div>
                </div>

                <DataTable columns={columns} data={quiz?.questions!} />
                <Link className='hover:underline flex items-center' href={'/admin/dashboard/quiz'}>
                    <ChevronLeft size={20} />
                    Back
                </Link>
                </>
            }
        </div>
    )
}

export default Page;