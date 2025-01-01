"use client"
import React, { useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useSessionContext } from '@/app/context/sessionContext'

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export default function FormComponent() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { isLoading, session } = useSessionContext() 

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        method: "post",
      })

      if (response?.ok) {
        toast.success("Login Successful")
      } else {
        const errorMessage = response?.error === "CredentialsSignin"
          ? "Email or password is incorrect"
          : response?.error
        toast.error(errorMessage)
      }
    } catch (error) {
      toast.error("An unexpected error occurred.")
      console.error("Login error:", error)
    }
  }

  useEffect(() => {
    if (!isLoading && session) {
      switch (session.user.role) {
        case "ADMIN":
        case "SUPERADMIN":
          window.location.href = "/admin/dashboard"
          break
        case "MEMBER":
          window.location.href = "/"
          break
        default:
          window.location.href = "/"
          break
      }
    }
  }, [isLoading, session])

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email"
                  {...field}
                  className={form.formState.errors.email ? "border-red-500" : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  {...field}
                  className={form.formState.errors.password ? "border-red-500" : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  )
}
