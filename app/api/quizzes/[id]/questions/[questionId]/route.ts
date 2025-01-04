import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Context {
    params: Promise<{
        id: string,
        questionId: string
    }>
}

export const GET = async (req: NextRequest, context: Context) => {
    try {
        const { id, questionId } = await context.params;
        const question = await prisma.questions.findUnique({
            where: {
                id: questionId,
            }
        });
        if (!question) return NextResponse.json({ success: false, message: "Question not found" }, { status: 404 });
        return NextResponse.json({ success: true, data: question });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
    }
}

export const PUT = async (req: NextRequest, context: Context) => {
    try {
        const { id, questionId } = await context.params;
        const { question, option1, option2, option3, option4, correctAnswerIndex } = await req.json();
        const user_id = (await getServerSession(authOptions))?.user?.id;
        if (!user_id) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const formatedAnswers = JSON.stringify({
            options: [
                {
                    answer: option1,
                    isCorrect: parseInt(correctAnswerIndex) === 0
                },
                {
                    answer: option2,
                    isCorrect: parseInt(correctAnswerIndex) === 1
                },
                {
                    answer: option3,
                    isCorrect: parseInt(correctAnswerIndex) === 2
                },
                {
                    answer: option4,
                    isCorrect: parseInt(correctAnswerIndex) === 3
                },
            ]
        });
        await prisma.questions.update({
            where: {
                id: questionId
            },
            data: {
                quizId: id,
                question: question,
                answer: formatedAnswers
            }
        })
        return NextResponse.json({ success: true, message: "Question updated successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
    }
}

export const DELETE = async (req: NextRequest, context: Context) => {
    try {
        const { id, questionId } = await context.params;
        const user_id = (await getServerSession(authOptions))?.user?.id;
        if (!user_id) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        await prisma.questions.delete({
            where: {
                id: questionId
            }
        })
        return NextResponse.json({ success: true, message: "Question deleted successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
    }
}