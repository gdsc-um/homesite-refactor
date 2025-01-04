"use client";
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FC } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Questions } from '@prisma/client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


interface QuestionFormProps {
    question?: Questions,
    type: "ADD" | "EDIT" | "SEE"
}

interface QuestionAnswer {
    answer: string | undefined,
    isCorrect: boolean | undefined
}

const schema = z.object({
    question: z.string().min(3, { message: "Question must be at least 3 characters" }).nonempty({ message: "Question cannot be empty" }),
    option1: z.string().nonempty({ message: "Option 1 cannot be empty" }),
    option2: z.string().nonempty({ message: "Option 2 cannot be empty" }),
    option3: z.string().nonempty({ message: "Option 3 cannot be empty" }),
    option4: z.string().nonempty({ message: "Option 4 cannot be empty" }),
    correctAnswerIndex: z.string().nonempty({ message: "Correct answer is required" })
})

const QuestionForm: FC<QuestionFormProps> = ({ question, type }) => {
    const router = useRouter();
    const { id: quizId } = useParams();
    const formatedQuestionAnswer: { options: QuestionAnswer[] } = type !== "ADD" && question?.answer ? JSON.parse(question?.answer) : {};
    const correctAnswerIndex = formatedQuestionAnswer?.options?.findIndex(option => option.isCorrect)

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            question: type === "ADD" ? '' : question?.question,
            option1: type === "ADD" ? '' : formatedQuestionAnswer?.options[0].answer,
            option2: type === "ADD" ? '' : formatedQuestionAnswer?.options[1].answer,
            option3: type === "ADD" ? '' : formatedQuestionAnswer?.options[2].answer,
            option4: type === "ADD" ? '' : formatedQuestionAnswer?.options[3].answer,
            correctAnswerIndex: type === "ADD" ? '' : `${correctAnswerIndex}`
        }
    })

    async function onSubmit(values: z.infer<typeof schema>) {
        let url = `/api/quizzes/${quizId}/questions`;
        if (type === "EDIT") url += `/${question?.id}`;
        const response = await fetch(url, {
            method: type === "ADD" ? "POST" : "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        });
        const data = await response.json();
        if (response.ok) {
            router.back();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                    {/* <Label className='text-lg ' htmlFor='question'>Question:</Label> */}
                    <FormField
                        control={form.control}
                        name='question'
                        render={({ field }) => {
                            return <FormItem>
                                <FormLabel className='text-lg'>Question</FormLabel>
                                <FormControl>
                                    <Input disabled={type === "SEE"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />
            </div>

            <div className='grid sm:grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                        <FormField
                            control={form.control}
                            name='option1'
                            render={({ field }) => {
                                return <FormItem className='w-full'>
                                    <FormLabel className='text-lg'>A:</FormLabel>
                                    <FormControl>
                                        <Input disabled={type === "SEE"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />
                </div>
                <div className='flex items-center gap-2'>
                        <FormField
                            control={form.control}
                            name='option2'
                            render={({ field }) => {
                                return <FormItem className='w-full'>
                                    <FormLabel className='text-lg'>B:</FormLabel>
                                    <FormControl>
                                        <Input disabled={type === "SEE"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />
                </div>
                <div className='flex items-center gap-2'>
                        <FormField
                            control={form.control}
                            name='option3'
                            render={({ field }) => {
                                return <FormItem className='w-full'>
                                    <FormLabel className='text-lg'>C:</FormLabel>
                                    <FormControl>
                                        <Input disabled={type === "SEE"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />
                </div>
                <div className='flex items-center gap-2'>
                        <FormField
                            control={form.control}
                            name='option4'
                            render={({ field }) => {
                                return <FormItem className='w-full'>
                                    <FormLabel className='text-lg'>D:</FormLabel>
                                    <FormControl>
                                        <Input disabled={type === "SEE"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }} />
                </div>
            </div>

            <div className='space-y-2 mt-4'>
                    <FormField
                        control={form.control}
                        name="correctAnswerIndex"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className='text-lg'>Correct Answer Index: </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex gap-4"
                                        disabled={type === "SEE"}
                                        {...field}
                                    >
                                        <FormItem className="flex items-center gap-1 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="0" />
                                            </FormControl>
                                            <FormLabel className="font-normal hover:cursor-pointer">
                                                A
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center gap-1 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="1" />
                                            </FormControl>
                                            <FormLabel className="font-normal hover:cursor-pointer">
                                                B
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center gap-1 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="2" />
                                            </FormControl>
                                            <FormLabel className="font-normal hover:cursor-pointer">
                                                C
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center gap-1 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="3" />
                                            </FormControl>
                                            <FormLabel className="font-normal hover:cursor-pointer">
                                                D
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
            </div>

            <div className='flex justify-end gap-4 mt-2'>
                <Button type='button' onClick={() => router.back()} variant='ghost'>{type === "ADD" ? 'Cancel' : 'Back'}</Button>
                {type !== "SEE" && <Button>Save</Button>}
            </div>
        </form>
        </Form>

    )
}

export default QuestionForm;