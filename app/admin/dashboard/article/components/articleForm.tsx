"use client";

import React, { FC, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { format } from "date-fns";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Editor from './editor';
import { Article } from '@prisma/client';

interface UserFormProps {
    article?: Article;
    type: "ADD" | "EDIT";
}

const schema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }).nonempty({ message: "Title cannot be empty" }),
    slug: z.string().min(3, { message: "Slug must be at least 3 characters" }).nonempty({ message: "Slug cannot be empty" }).max(60, { message: "Slug cannot be more than 60 characters" }),
    author: z.string().min(3, { message: "Author must be at least 3 character" }).nonempty({ message: "Author cannot be empty" }),
    date: z.date(),
    content: z.string().min(10, { message: "Content must be at least 10 characters" }).nonempty({ message: "Content cannot be empty" }),
    banner: z.string().nonempty({message: "Banner image URL cannot be empty"}).url({ message: "Invalid URL" })
});

const ArticleForm: FC<UserFormProps> = ({ article, type }) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: article?.title || '',
            slug: article?.slug || '',
            author: article?.author || '',
            date: article?.date ? new Date(article.date) : new Date(),
            content: article?.content || '',
            banner: article?.banner || '',
        }
    });

    async function onSubmit(values: z.infer<typeof schema>) {
        console.log(values);
        const method = type === 'EDIT' ? 'PUT' : 'POST';
        const url = type === 'EDIT' ? `/api/article/${article?.slug}` : '/api/article';

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            toast.success(type === 'EDIT' ? 'Article updated successfully!' : 'Article added successfully!');
            router.push('/admin/dashboard/article');
        } else {
            const errorResponse = await response.json();
            if (response.status === 400 && errorResponse.error === 'Slug already exists') {
                toast.error('Slug already exists. Please choose a different one.');
            } else {
                toast.error('Something went wrong');
            }
        }
    }

    //     const { name, value } = e.target;

    //     if (name === 'slug') {
    //         // Ganti spasi dengan dash (-)
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             [name]: value.replace(/\s+/g, '-'), // Mengganti semua spasi dengan dash
    //         }));
    //     } else {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             [name]: value,
    //         }));
    //     }
    // };
    

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    
    //     const method = type === 'EDIT' ? 'PUT' : 'POST';
    //     const url = type === 'EDIT' ? `/api/article/${formData.slug}` : '/api/article';
    
    //     const response = await fetch(url, {
    //         method,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formData),
    //     });
    
    //     if (response.ok) {
    //         toast.success(type === 'EDIT' ? 'Article updated successfully!' : 'Article added successfully!');
    //         router.push('/admin/dashboard/article');
    //     } else {
    //         const errorResponse = await response.json();
    //         if (response.status === 400 && errorResponse.error === 'Slug already exists') {
    //             toast.error('Slug already exists. Please choose a different one.');
    //         } else {
    //             // toast.error('Sek Error');
    //             // console.log(errorResponse);
    //             toast.error('Something went wrong');
    //         }
    //     }
    // };
    
    return (
        <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-1 md:space-y-2">
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => {
                            return <FormItem>
                                <FormLabel>
                                    <h4 className='texg-lg'>Title</h4>
                                </FormLabel>
                                <FormControl>
                                    <Input className='shadow' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        }} />
            </div>
            <div className="space-y-1 md:space-y-2">
                    <FormField
                        control={form.control}
                        name='slug'
                        render={({ field }) => {
                            const handleChange = (e: any)=>{
                                e.target.value = e.target.value.replace(/\s+/g, '-')
                                field.onChange(e)
                            }
                            return <FormItem>
                                <FormLabel>
                                    <h4 className='texg-lg'>Slug (Title Link)</h4>
                                </FormLabel>
                                <FormControl>
                                    <Input className='shadow' placeholder='max 60 characters' onChange={handleChange} value={field.value} ref={field.ref} onBlur={field.onBlur} name={field.name}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        }} />
            </div>

            <div className="space-y-1 md:space-y-2">
                    <FormField
                        control={form.control}
                        name='author'
                        render={({ field }) => {
                            return <FormItem>
                                <FormLabel>
                                    <h4 className='texg-lg'>Author</h4>
                                </FormLabel>
                                <FormControl>
                                    <Input className='shadow' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }} />
            </div>

            <div className="space-y-1 md:space-y-2">
                    <FormField
                        control={form.control}
                        name='date'
                        render={({ field }) => {
                            return <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}

                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>

                        }} />

            </div>

            <div className="space-y-1 md:space-y-2">
                    <FormField
                        control={form.control}
                        name='content'
                        render={({ field }) => {
                            return <FormItem>
                                <FormLabel>
                                    <h4 className='texg-lg'>Content</h4>
                                </FormLabel>
                                <FormControl>
                                    <Editor setValue={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        }} />
            </div>

            <div className="space-y-1 md:space-y-2">
                    <FormField
                        control={form.control}
                        name='banner'
                        render={({ field }) => {
                            return <FormItem>
                                <FormLabel>
                                    <h4 className='texg-lg'>Banner Image URL</h4>
                                </FormLabel>
                                <FormControl>
                                    <Input className='shadow' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        }} />
            </div>

            <div className="flex justify-end gap-4 mt-4 lg:mt-10">
                <Button
                    type="button"
                    onClick={() => router.push('/admin/dashboard/article')}
                    variant="ghost"
                >
                    {type === "EDIT" ? 'Cancel' : 'Back'}
                </Button>
                <Button type="submit">Save</Button>
            </div>
        </form>
        </Form>
    );
};

export default ArticleForm;
