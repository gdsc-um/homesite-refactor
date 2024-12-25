"use client";

import React, { FC } from 'react'
import { Quiz, QuizType } from '../lib/definition'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface QuizFormProps {
    quiz?: Quiz,
    type: "ADD" | "EDIT"
}

const QuizForm: FC<QuizFormProps> = ({ quiz, type }) => {
    const router = useRouter();

    const quizTypes = Object.values(QuizType);
    return (
        <>
            <form className='flex flex-col gap-6'>
                <div className='space-y-1 md:space-y-2'>
                    <Label className='text-lg ' htmlFor='title'>Title</Label>
                    <Input type='text' defaultValue={type === "ADD" ? '' : quiz?.title} name='title' id='title' required />
                </div>
                <div className='space-y-1 md:space-y-2'>
                    <Label className='text-lg ' htmlFor='description'>Description</Label>
                    <Textarea className='shadow min-h-[7rem]' defaultValue={type === "ADD" ? '' : quiz?.description} name='description' id='description' required />
                </div>
                <div className='grid md:grid-cols-4 gap-4'>
                    <div className='space-y-1 md:space-y-2 col-span-2 lg:col-span-3'>
                        <Label className='text-lg ' htmlFor='image'>Image URL</Label>
                        <Input type='url' defaultValue={type === "ADD" ? '' : quiz?.image} name='image' id='image' required />
                    </div>
                    <div className='space-y-1 md:space-y-2 col-span-2 lg:col-span-1'>
                        <Label className='text-lg ' htmlFor='type'>Type</Label>
                        <Select defaultValue={type === "ADD" ? '' : quiz?.type} name='type' required>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select a quiz type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {quizTypes.map(type => {
                                        return <SelectItem key={type} value={type}>{type}</SelectItem>
                                    })}

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='flex justify-end gap-4 mt-4 lg:mt-10'>
                    <Button type='button' onClick={() => router.back()} variant='ghost'>{type === "ADD" ? 'Cancel' : 'Back'}</Button>
                    <Button>Save</Button>
                </div>
        </form>
        </>
    )
}

export default QuizForm