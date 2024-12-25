"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { QUIZZES } from "./data/quizzes";
import { Input } from "@/components/ui/input";




const QuizPage: FC = () => {
    const router = useRouter();

    return (
        <div className="px-6 max-w-[80rem] mx-auto">
            <header className="flex flex-col gap-4 py-4">
                <h3 className="font-semibold text-3xl ">Quiz</h3>
                <div className="grid grid-cols-2">
                    <Button onClick={() => router.push(`quiz/create`)} className="w-[5rem] sm:w-[10rem]">Add</Button>
                    <div className="flex justify-end">
                        <Input className="max-w-[15rem]" type="text" name="search" placeholder="Search..." />
                    </div>
                </div>
            </header>

            <DataTable columns={columns} data={QUIZZES} />
        </div>
    )
}

export default QuizPage