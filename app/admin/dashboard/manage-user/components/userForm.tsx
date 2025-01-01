"use client";

import React, { FC } from 'react'
import { User, UserRole } from '../lib/definition'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface UserFormProps {
    user?: User,
    type: "ADD" | "EDIT"
}

const UserForm: FC<UserFormProps> = ({ user, type }) => {
    const router = useRouter();

    const userRoles = Object.values(UserRole);

    return (
        <>
            <form className='flex flex-col gap-6'>
                {/* add for profile picture */}
                <div className='space-y-1 md:space-y-2'>
                    <Label className='text-lg ' htmlFor='picture'>Profile Picture</Label>
                    <Input type='url' defaultValue={type === "ADD" ? '' : user?.picture} name='picture' id='picture' required />
                </div>
                <div className='space-y-1 md:space-y-2'>
                    <Label className='text-lg ' htmlFor='name'>Name</Label>
                    <Input type='text' defaultValue={type === "ADD" ? '' : user?.name} name='name' id='name' required />
                </div>
                <div className='space-y-1 md:space-y-2'>
                    <Label className='text-lg ' htmlFor='email'>Email</Label>
                    <Input type='email' defaultValue={type === "ADD" ? '' : user?.email} name='email' id='email' required />
                </div>
                <div className='space-y-1 md:space-y-2'>
                    <Label className='text-lg ' htmlFor='role'>Role</Label>
                    <Select defaultValue={type === "ADD" ? '' : user?.role} name='role' required>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {userRoles.map(role => {
                                    return <SelectItem key={role} value={role}>{role}</SelectItem>
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex justify-end gap-4 mt-4 lg:mt-10'>
                    <Button type='button' onClick={() => router.back()} variant='ghost'>{type === "ADD" ? 'Cancel' : 'Back'}</Button>
                    <Button>Save</Button>
                </div>
        </form>
        </>
    )
}

export default UserForm