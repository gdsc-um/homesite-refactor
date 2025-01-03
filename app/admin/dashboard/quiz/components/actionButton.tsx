"use client";

import { CircleAlert, Eye, Pencil, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";


import { Button } from '@/components/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { QuizWithAuthor } from '../lib/definition';
import { Questions } from '@prisma/client';

interface ActionButtonProps {
    data: Questions | QuizWithAuthor,
    type: "QUIZ" | "QUESTION",
}

const ActionButton: FC<ActionButtonProps> = ({ data, type }) => {
    const router = useRouter();

    const handleSeeDetailClick = () => {
        let url = `quiz/${data.id}`;
        if (type === "QUESTION" && "quizId" in data) url = `${data.quizId}/${data.id}`;
        router.push(url);
    }

    const handleEditClick = () => {
        let url = `quiz/${data.id}/edit`;
        if (type === "QUESTION" && "quizId" in data) url = `${data.quizId}/${data.id}/edit`;
        router.push(url);
    }

    const handleDeleteClick = () => {
        // Pass
    }

    return (
        <TooltipProvider delayDuration={100}>
            <div className="flex justify-center gap-6 py-4">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button onClick={handleSeeDetailClick}>
                            <Eye size={15} />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>See Detail</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <button onClick={handleEditClick} className="">
                            <Pencil size={15} />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Edit</p>
                    </TooltipContent>
                </Tooltip>

            <Dialog>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                                <button onClick={handleDeleteClick}>
                                    <Trash color='#ef4444' size={15} />
                                </button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete</p>
                        </TooltipContent>
                    </Tooltip>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='flex items-center gap-2 mb-2'>
                            <CircleAlert size={20} color='#ef4444' />
                            Are you absolutely sure?
                        </DialogTitle>
                        <DialogDescription>
                                This action cannot be undone. This will permanently delete {type === "QUESTION" ? "question " : "quiz "}
                            from our database.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'ghost'}>Cancel</Button>
                        </DialogClose>
                        <Button variant={'destructive'}>Yes, delete it.</Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            </div>
        </TooltipProvider>

    )
}

export default ActionButton