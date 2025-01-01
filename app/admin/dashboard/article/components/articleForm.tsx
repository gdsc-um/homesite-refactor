"use client";

import React, { FC } from 'react'
import { Article } from '../lib/definition'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface UserFormProps {
    article?: Article,
    type: "ADD" | "EDIT"
}

const ArticleForm: FC<UserFormProps> = ({ article, type }) => {
    const router = useRouter();

    return (
      <>
      {/* make the columns field is title , author, date, content, and link image */}
      <form className='flex flex-col gap-6'>
          <div className='space-y-1 md:space-y-2'>
              <Label className='text-lg ' htmlFor='title'>Title</Label>
              <Input type='text' defaultValue={type === "ADD" ? '' : article?.title} name='title' id='title' required />
          </div>
          <div className='space-y-1 md:space-y-2'>
              <Label className='text-lg ' htmlFor='author'>Author</Label>
              <Input type='text' defaultValue={type === "ADD" ? '' : article?.author} name='author' id='author' required />
          </div>
          <div className='space-y-1 md:space-y-2'>
              <Label className='text-lg ' htmlFor='date'>Date</Label>
              <Input type='date' defaultValue={type === "ADD" ? '' : article?.date} name='date' id='date' required />
          </div>
          <div className='space-y-1 md:space-y-2'>
              <Label className='text-lg ' htmlFor='content'>Content</Label>
              <Textarea defaultValue={type === "ADD" ? '' : article?.content} name='content' id='content' required />
          </div>
          <div className='space-y-1 md:space-y-2'>
              <Label className='text-lg ' htmlFor='image'>Image</Label>
              <Input type='url' defaultValue={type === "ADD" ? '' : article?.image} name='image' id='image' required />
          </div>
          <div className='flex justify-end gap-4 mt-4 lg:mt-10'>
              <Button type='button' onClick={() => router.back()} variant='ghost'>{type === "ADD" ? 'Cancel' : 'Back'}</Button>
              <Button>Save</Button>
          </div>
      </form>
      </>

    )
}

export default ArticleForm;
