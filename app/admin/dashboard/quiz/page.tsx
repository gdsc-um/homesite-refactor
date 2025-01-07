"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { columns } from "./components/quizColumns";
import { Quiz, User } from "@prisma/client";
import { QuizWithAuthor } from "./lib/definition";



const QuizPage: FC = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [quizzes, setQuizzes] = useState<QuizWithAuthor[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchQuizzes = async () => {
            let url = `/api/quizzes`;
            if (searchInput) url += `?search=${searchInput}`
            const response = await fetch(url);
            const data = await response.json();
            setQuizzes(data.data);
            setIsLoading(false);
        }
        // Implement debounce for reducing the frequency of API calls while typing in the search input
        const timer = setTimeout(fetchQuizzes, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    return (
        <div className="px-6 max-w-[80rem] mx-auto">
            <header className="flex flex-col gap-4 py-4">
                <h3 className="font-semibold text-3xl ">Quiz</h3>
                <div className="grid grid-cols-2">
                    <Button onClick={() => router.push(`quiz/create`)} className="w-[5rem] sm:w-[10rem]">Add</Button>
                    <div className="flex justify-end">
                        <Input value={searchInput} onChange={({ target }) => setSearchInput(target.value)} className="max-w-[15rem]" type="text" name="search" placeholder="Search..." />
                    </div>
                </div>
            </header>

            {!isLoading && <DataTable columns={columns} data={quizzes} />}
            {isLoading && <h4 className="text-center animate-pulse text-lg mt-10">Loading...</h4>}
        </div>
    )
}

export default QuizPage;