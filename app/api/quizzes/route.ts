import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams;
        const searchQuery = searchParams.get('search');
        let quizzes;
        if (searchQuery) {
            quizzes = await prisma.quiz.findMany({
                include: {
                    author: true,
                    questions: true,
                },
                where: {
                    OR: [
                        {
                            title: {
                                contains: searchQuery,
                            }
                        },
                        {
                            content: {
                                contains: searchQuery
                            }
                        },
                        {
                            author: {
                                OR: [
                                    {
                                        name: {
                                            contains: searchQuery
                                        }
                                    },
                                    {
                                        email: {
                                            contains: searchQuery
                                        }
                                    }
                                ]
                            }
                        },
                        {

                        }
                    ]
                },
                orderBy: {
                    createdAt: "asc"
                }
            })
        }
        else {
            quizzes = await prisma.quiz.findMany({
            include: {
                author: true,
                questions: true
            },
            orderBy: {
                createdAt: "asc"
            }
        });
        }

        return NextResponse.json({ success: true, data: quizzes });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const { title, content, image, quizType, isPublished } =
			await req.json();
        const validQuizTypes = ["WEB", "MOBILE", "ML", "UIUX", "OTHER"];
        if (!validQuizTypes.includes(quizType)) {
            return NextResponse.json({ success: false, message: "Invalid quiz type" }, { status: 400 });
        }
        const user_id = (await getServerSession(authOptions))?.user?.id;
        if (!user_id) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        await prisma.quiz.create({
            data: {
                title,
                content,
                image,
                quizType,
                isPublished,
                authorId: user_id,
            }
        });
        return NextResponse.json({ success: true, message: "Quiz created successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
    }
}