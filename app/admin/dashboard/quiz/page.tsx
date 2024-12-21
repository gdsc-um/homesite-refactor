"use client"

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation";
import { Eye, Trash } from "lucide-react"
import { FC } from "react";
import { deleteQuiz } from "./lib/action";
import { QUIZZES } from "./data/quizzes";
import DeleteQuizBtn from "./components/deleteQuizBtn";



const QuizPage: FC = () => {
    const router = useRouter();

    const handleSeeDetailQuiz = (quizId: string) => {
        console.log(`Seeing detail quiz with id ${quizId}`);
        router.push(`quiz/${quizId}`)
    }

    return (
        <div className="px-6 max-w-[80rem] mx-auto">
            <header className="flex flex-col gap-4 py-4">
                <h3 className="font-semibold text-3xl ">Quiz</h3>
                <div className="flex justify-end">
                    <Button onClick={() => router.push(`quiz/create`)} className="w-[5rem] sm:w-[10rem]">Add</Button>
                </div>
            </header>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">#</TableHead>
                        <TableHead className="text-center">Question</TableHead>
                        <TableHead className="text-center">Author</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {QUIZZES.map((quiz, index) => (
                        <TableRow key={quiz.id}>
                            <TableCell className="py-6 font-medium text-center">{++index}.</TableCell>
                            <TableCell className="py-6 max-w-[10rem]">{quiz.question}</TableCell>
                            <TableCell className="py-6 text-center">{quiz.author}</TableCell>
                            <TableCell className="py-6 ">
                                <div className="flex justify-center gap-6">
                                    <button onClick={() => handleSeeDetailQuiz(quiz.id)} className="">
                                        <Eye size={15} />
                                    </button>
                                    <DeleteQuizBtn id={quiz.id} />

                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total:</TableCell>
                        <TableCell className="text-center">{QUIZZES.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default QuizPage