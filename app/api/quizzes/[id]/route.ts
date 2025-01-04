import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Context {
    params: Promise<{
        id: string
    }>
}

export const GET = async (req: NextRequest, context: Context) => {
    try {
        const { id } = await context.params;
        const quiz = await prisma.quiz.findUnique({
            where: {
                id
            },
            include: {
                questions: true,
                author: true,
                results: true
            }
        })
        if (!quiz) return NextResponse.json({ success: false, message: "Quiz not found" }, { status: 404 });

        return NextResponse.json({ success: true, data: quiz });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
    }
}

export const PUT = async (req: NextRequest, context: Context) => {
    try {
        const { id } = await context.params;
        const { title, content, image, quizType } = await req.json();
        const validQuizTypes = ["WEB", "MOBILE", "ML", "UIUX", "OTHER"];
        if (!validQuizTypes.includes(quizType)) {
            return NextResponse.json({ success: false, message: "Invalid quiz type" }, { status: 400 });
        }
        await prisma.quiz.update({
            where: {
                id
            },
            data: {
                title,
                content,
                image,
                quizType
            }
        });
        return NextResponse.json({ success: true, message: "Quiz updated successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
    }
}

export const DELETE = async (req: NextRequest, context: Context) => {
    try {
        const { id } = await context.params;
        await prisma.quiz.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json({ success: true, message: "Quiz deleted successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
    }
}