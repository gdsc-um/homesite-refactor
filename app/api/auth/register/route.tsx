import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

interface CreateUserBodyProps {
    username: string;
    nim: string;
    name: string;
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, nim, email, password }: CreateUserBodyProps = body

        // Form data checking and password length checking
        if (!name || !email) {
            return NextResponse.json({ error: "field name and email is required" }, { status: 400 })
        }

        // Check if the email is valid
        const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const isValidEmail: boolean = regEx.test(email);
        if (!isValidEmail) {
            return NextResponse.json({ error: "invalid email" }, { status: 400 })
        }

        // Check password length
        if (password.length < 8) {
            return NextResponse.json({ error: "password minimum length is 8" }, { status: 400 })
        }

        // Find the user
        const user = await prisma.user.findFirst({
            where: {
            OR: [
                { email: email },
                { nim: nim }
            ]
            }
        })

        // Check if user already exists or not
        if (user) {
            return NextResponse.json({ error: "user already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const userCreated = await prisma.user.create({
            data: {
                name: name,
                nim: nim,
                email: email,
                password: hashedPassword,
            }
        })

        return NextResponse.json({ message: "User created successfully", user: userCreated }, { status: 201 })
    } catch (error: Error | any) {
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
    }
}

