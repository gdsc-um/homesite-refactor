"use client";

import { CircleAlert, Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import { Button } from '@/components/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { Question, Quiz } from '../lib/definition';

interface ActionButtonProps {
    data: Question | Quiz,
    type: "QUIZ" | "QUESTION"
}

const ActionButton: FC<ActionButtonProps> = ({ data, type }) => {
    const router = useRouter();

    const handleEditClick = () => {
        let url = `quiz/${data.id}`;

        if (type === "QUESTION") url = `question/${data.id}`;
        router.push(url);
    }

    const handleDeleteClick = () => {
        // Pass
    }

    return (
        <div className="flex justify-center gap-6 py-4">
            <button onClick={handleEditClick} className="">
                <Pencil size={15} />
            </button>
            <Dialog>
                <DialogTrigger asChild>
                    <button onClick={handleDeleteClick}>
                        <Trash color='#ef4444' size={15} />
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='flex items-center gap-2 mb-2'>
                            <CircleAlert size={20} color='#ef4444' />
                            Are you absolutely sure?
                        </DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete quiz
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
    )
}

export default ActionButton