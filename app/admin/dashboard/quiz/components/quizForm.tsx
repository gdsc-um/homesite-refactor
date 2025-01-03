"use client";

import React, { FC } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Quiz } from '@prisma/client';

interface QuizFormProps {
    quiz?: Quiz,
    type: "ADD" | "EDIT"
}

const schema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }).nonempty({ message: "Title cannot be empty" }),
    content: z.string().min(10, { message: "Content must be at least 10 characters" }).nonempty({ message: "Content cannot be empty" }),
    image: z.string().url({ message: "Invalid URL" }),
    quizType: z.string().nonempty({ message: "Quiz type is required" })
});


const QuizForm: FC<QuizFormProps> = ({ quiz, type }) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: type === "ADD" ? '' : quiz?.title,
            content: type === "ADD" ? '' : quiz?.content,
            image: type === "ADD" ? '' : quiz?.image,
            quizType: type === "ADD" ? '' : quiz?.quizType
        }
    })

    async function onSubmit(values: z.infer<typeof schema>) {
        const response = await fetch('/api/quizzes', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        });
        const data = await response.json();
        if (response.ok) {
            router.push('/admin/dashboard/quiz');
        }
    }
    const router = useRouter();

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">

                    <div className='space-y-1 md:space-y-2'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => {
                                return <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input className='shadow' placeholder='Title' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            }} />
                    </div>
                    <div className='space-y-1 md:space-y-2'>
                        <FormField
                            control={form.control}
                            name='content'
                            render={({ field }) => {
                                return <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea className='shadow min-h-[7rem]' placeholder='Content' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            }} />
                    </div>
                    <div className='grid md:grid-cols-4 gap-4'>
                        <div className='space-y-1 md:space-y-2 col-span-2 lg:col-span-3'>
                            <FormField
                                control={form.control}
                                name='image'
                                render={({ field }) => {
                                    return <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Image URL' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                }} />
                        </div>
                        <div className='space-y-1 md:space-y-2 col-span-2 lg:col-span-1'>
                            <FormField
                                control={form.control}
                                name='quizType'
                                render={({ field }) => {
                                    return <FormItem>
                                        <FormLabel>Quiz Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select a quiz type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {/* {quizTypes.map(type => {
                                                        return <SelectItem key={type} value={type}>{type}</SelectItem>
                                                    })} */}
                                                    <SelectItem value="WEB">Web Development</SelectItem>
                                                    <SelectItem value="MOBILE">Mobile Development</SelectItem>
                                                    <SelectItem value="ML">Machine Learning</SelectItem>
                                                    <SelectItem value="UIUX">UI/UX</SelectItem>
                                                    <SelectItem value="OTHER">Other</SelectItem>

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>

                                }} />

                        </div>
                    </div>

                    <Button type='submit'>Submit</Button>
                </form>
            </Form>
        </>
    )
}

export default QuizForm