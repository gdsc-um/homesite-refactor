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
import { Userssss } from '../lib/definition';
import toast from 'react-hot-toast';

interface ActionButtonProps {
    data: Userssss,
    type: "USER";
}

const ActionButton: FC<ActionButtonProps> = ({ data }) => {
    const router = useRouter();
    const [isDeleteConfirmed, setIsDeleteConfirmed] = React.useState(false);

    const handleSeeDetailClick = () => {
        console.log(data.profil_bevy);
        if (data.profil_bevy) {
            router.push(data.profil_bevy); 
        }
    }

    const handleEditClick = () => {
        const url = `manage-user/${data.email}/edit`; // Changed to const
        router.push(url);
    }

    const handleDeleteClick = async () => {
        const res = await fetch(`/api/user/${data.email}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            toast.success('User deleted successfully');
            router.refresh();
            router.push('/admin/dashboard');
        }else{
            toast.error('Failed to delete user');
        }
    }

    const handleDilogOpen = () => {
        setIsDeleteConfirmed(true);
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
                        See Detail
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button onClick={handleEditClick}>
                            <Pencil size={15} />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Edit
                    </TooltipContent>
                </Tooltip>
            
                <Dialog>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                                <button onClick={handleDilogOpen}>
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
                                This action cannot be undone. This will permanently delete the user
                            from our database.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'ghost'}>Cancel</Button>
                        </DialogClose>
                        <Button variant={'destructive'} onClick={handleDeleteClick}>
                        Yes, delete it.
                        </Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            </div>
        </TooltipProvider>
    )
}

export default ActionButton;
