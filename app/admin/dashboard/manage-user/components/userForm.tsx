"use client";

import React, { FC } from "react";
import { Userssss, UserRole, TimRole } from "../lib/definition";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface UserFormProps {
  user?: Userssss;
  type: "ADD" | "EDIT";
}

const UserForm: FC<UserFormProps> = ({ user, type }) => {
  const router = useRouter();

  const userRoles = Object.values(UserRole);
  const timRoles = Object.values(TimRole);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const method = type === 'EDIT' ? 'PUT' : 'POST';
    const url = type === 'EDIT' ? `/api/user/${user?.email}` : '/api/user';

    try {
        const response = await fetch(url,{
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        // Handle status
        if (response.ok) {
            const updatedUser = await response.json();
            toast.success('User updated successfully');
            router.push('/admin/dashboard/manage-user');
        }else{
            const error = await response.json();
            if (response.status === 400 && error.error === 'Slug already exists') {
                toast.error('Slug already exists. Please choose a different one.');
            } else {
                // toast.error('Sek Error');
                // console.log(errorResponse);
                toast.error('Something went wrong');
            }
        }
        } catch (error) {
            toast.error('An error occurred while submitting the form');
        }
    };

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="space-y-1 md:space-y-2">
          <Label className="text-lg " htmlFor="name">
            Name
          </Label>
          <br />
          <small> as listed on bevy </small>
          <Input
            type="text"
            defaultValue={type === "ADD" ? "" : user?.name}
            name="name"
            id="name"
            required
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label className="text-lg " htmlFor="nim">
            NIM
          </Label>
          <br />
          <Input
            type="text"
            defaultValue={type === "ADD" ? "" : user?.nim}
            name="nim"
            id="nim"
            required
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label className="text-lg " htmlFor="email">
            Email
          </Label>
          <br />
          <small> as listed on bevy </small>
          <Input
            type="email"
            defaultValue={type === "ADD" ? "" : user?.email}
            name="email"
            id="email"
            required
            readOnly={type === "EDIT"}
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label className="text-lg " htmlFor="email">
            Password
          </Label>
          <br />
            {type === "EDIT" ? <small> Leave blank to keep the same password </small> : <small> as listed on bevy </small>}
          <Input
            type="text"
            defaultValue={type === "ADD" ? "" : user?.password}
            name="text"
            id="text"
            required
            // readOnly={type === "EDIT"}
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label className="text-lg " htmlFor="profil_bevy">
            Profile Bevy
          </Label>
          <br />
          <small> use link for bevy </small>
          <Input
            type="url"
            defaultValue={type === "ADD" ? "" : user?.profil_bevy}
            name="profil_bevy"
            id="profil_bevy"
            required
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label className="text-lg " htmlFor="picture">
            Profile Picture
          </Label>
          <br />
          <small> use link cdn only </small>
          <Input
            type="url"
            defaultValue={type === "ADD" ? "" : user?.avatar}
            name="avatar"
            id="picture"
            required
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label className="text-lg " htmlFor="role_tim">
            Role Team
          </Label>
          <Select
            defaultValue={type === "ADD" ? "" : user?.role_tim}
            name="role_tim"
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {timRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label className="text-lg " htmlFor="role">
            Role
          </Label>
          <Select
            defaultValue={type === "ADD" ? "" : user?.role}
            name="role"
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {userRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-4 mt-4 lg:mt-10">
          <Button
            type="button"
            onClick={() => router.back()}
            variant="ghost"
          >
            {type === "ADD" ? "Cancel" : "Back"}
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
