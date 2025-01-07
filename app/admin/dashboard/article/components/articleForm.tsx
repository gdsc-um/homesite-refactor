"use client";

import React, { FC, useState } from 'react';
import { Article } from '../lib/definition';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { error } from 'console';
import { toast } from 'react-hot-toast';

interface UserFormProps {
    article?: Article;
    type: "ADD" | "EDIT";
}

const ArticleForm: FC<UserFormProps> = ({ article, type }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: article?.title || '',
        slug: article?.slug || '',
        author: article?.author || '',
        date: article?.date || '',
        content: article?.content || '',
        image: article?.image || '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
    
        if (name === 'slug') {
            // Ganti spasi dengan dash (-)
            setFormData((prevData) => ({
                ...prevData,
                [name]: value.replace(/\s+/g, '-'), // Mengganti semua spasi dengan dash
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const response = await fetch('/api/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    
        if (response.ok) {
            toast.success('Article added successfully!');
            router.push('/admin/dashboard/article');
        } else {
            const errorResponse = await response.json();
            if (response.status === 400 && errorResponse.error === 'Slug already exists') {
                toast.error('Slug already exists. Please choose a different one.');
            } else {
                toast.error('Something went wrong');
            }
        }
    };
    
    

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="space-y-1 md:space-y-2">
                <Label className="text-lg" htmlFor="title">Title</Label>
                <Input
                    type="text"
                    value={formData.title}
                    name="title"
                    id="title"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="space-y-1 md:space-y-2">
                <Label className="text-lg" htmlFor="slug">Title Link</Label>
                <Input
                    type="text"
                    value={formData.slug}
                    name="slug"
                    id="slug"
                    onChange={handleInputChange}
                    placeholder="max 60 characters"
                    required
                    maxLength={60}
                />
            </div>

            <div className="space-y-1 md:space-y-2">
                <Label className="text-lg" htmlFor="author">Author</Label>
                <Input
                    type="text"
                    value={formData.author}
                    name="author"
                    id="author"
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="space-y-1 md:space-y-2">
                <Label className="text-lg" htmlFor="date">Date</Label>
                <Input
                    type="date"
                    value={formData.date}
                    name="date"
                    id="date"
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="space-y-1 md:space-y-2">
                <Label className="text-lg" htmlFor="content">Content</Label>
                <Textarea
                    value={formData.content}
                    name="content"
                    id="content"
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="space-y-1 md:space-y-2">
                <Label className="text-lg" htmlFor="image">Image</Label>
                <Input
                    type="url"
                    value={"banner.jpg"}
                    name="image"
                    id="image"
                    onChange={handleInputChange}
                    placeholder="banner.jpg"
                    readOnly
                />
            </div>

            <div className="flex justify-end gap-4 mt-4 lg:mt-10">
                <Button
                    type="button"
                    onClick={handleSubmit}
                    variant="ghost"
                >
                    {type === "EDIT" ? 'Cancel' : 'Back'}
                </Button>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
};

export default ArticleForm;
