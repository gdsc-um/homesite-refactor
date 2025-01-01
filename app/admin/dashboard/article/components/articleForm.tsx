"use client";

import React, { FC } from 'react';
import { Article } from '../lib/definition'; // Ensure this type is correctly defined
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface UserFormProps {
    article?: Article;  // Optional because it may not be present in the "ADD" case
    type: "ADD" | "EDIT";  // Type to distinguish between adding and editing
}

const ArticleForm: FC<UserFormProps> = ({ article, type }) => {
    const router = useRouter();

    return (
        <form className="flex flex-col gap-6">
            {/* Title Field */}
            <div className="space-y-1 md:space-y-2">
                <Label className="text-lg" htmlFor="title">Title</Label>
                <Input
                    type="text"
                    defaultValue={type === "ADD" ? '' : article?.title}
                    name="title"
                    id="title"
                    required
                />
            </div>

            {/* Author Field */}
            <div className="space-y-1 md:space-y-2">
                <Label className="text-lg" htmlFor="author">Author</Label>
                <Input
                    type="text"
                    defaultValue={type === "ADD" ? '' : article?.author}
                    name="author"
                    id="author"
                    required
                />
            </div>

            {/* Date Field */}
            <div className="space-y-1 md:space-y-2">
                <Label className="text-lg" htmlFor="date">Date</Label>
                <Input
                    type="date"
                    defaultValue={type === "ADD" ? '' : article?.date}
                    name="date"
                    id="date"
                    required
                />
            </div>

            {/* Content Field */}
            <div className="space-y-1 md:space-y-2">
                <Label className="text-lg" htmlFor="content">Content</Label>
                <Textarea
                    defaultValue={type === "ADD" ? '' : article?.content}
                    name="content"
                    id="content"
                    required
                />
            </div>

            {/* Image Field */}
            <div className="space-y-1 md:space-y-2">
                <Label className="text-lg" htmlFor="image">Image</Label>
                <Input
                    type="url"
                    defaultValue={type === "ADD" ? '' : article?.image}
                    name="image"
                    id="image"
                    required
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-4 lg:mt-10">
                <Button
                    type="button"
                    onClick={() => router.back()}
                    variant="ghost"
                >
                    {type === "ADD" ? 'Cancel' : 'Back'}
                </Button>
                <Button>Save</Button>
            </div>
        </form>
    );
};

export default ArticleForm;
