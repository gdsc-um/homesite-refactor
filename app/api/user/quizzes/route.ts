import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { QuizType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const searchQuery = searchParams.get("search");
		let quizzes;
		if (searchQuery) {
            const normalizedSearchQuery = searchQuery.toUpperCase();

            const isQuizType = Object.values(QuizType).includes(
                normalizedSearchQuery as QuizType
);
			quizzes = await prisma.quiz.findMany({
				where: {
					OR: [
						{
							title: {
								contains: searchQuery,
							},
						},
						{
							content: {
								contains: searchQuery,
							},
						},
						isQuizType
							? {
									quizType: {
										equals: normalizedSearchQuery as QuizType, 
									},
							  }
							: {}, // Skip if not a valid enum
						{
							author: {
								OR: [
									{
										name: {
											contains: searchQuery,
										},
									},
								],
							},
						},
						{},
					],
				},
				orderBy: {
					createdAt: "asc",
				},
			});
		} else {
			quizzes = await prisma.quiz.findMany({
				orderBy: {
					createdAt: "asc",
				},
			});
		}

		return NextResponse.json({ success: true, data: quizzes });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ success: false, error: "An error occurred" },
			{ status: 500 }
		);
	}
};
