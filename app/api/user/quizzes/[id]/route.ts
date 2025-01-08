import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CryptoJS from "crypto-js";

interface Context {
	params: Promise<{
		id: string;
	}>;
}

const secretKey = "177b3b7f-4b97-4d0d-9b1f-1d1f0b1b0e7d";

const encryptData = (data: any) => {
	const stringifiedData = JSON.stringify(data);
	return CryptoJS.AES.encrypt(stringifiedData, secretKey).toString();
};

export const GET = async (req: NextRequest, context: Context) => {
	try {
        const user_id = (await getServerSession(authOptions))?.user?.id;
        if (!user_id) {
            return NextResponse.redirect("/auth/login");
        }
		const { id } = await context.params;

		const quiz = await prisma.quiz.findUnique({
			where: { id: id },
			include: {
				questions: true,
			},
		});

		// If quiz not found
		if (!quiz) {
			return NextResponse.json(
				{ message: "Quiz not found" },
				{ status: 404 }
			);
		}

		// Parse the options stored in JSON format for each question
		const questionsWithOptions = quiz.questions.map((question) => {
			const answer = JSON.parse(question.answer);
			return {
				...question,
				answer: answer,
			};
		});

		// Encrypt the data before sending
		const encryptedQuizData = encryptData({
			id: quiz.id,
			title: quiz.title,
			questions: questionsWithOptions,
		});

		// Send the encrypted data to the frontend
		return NextResponse.json({ data: encryptedQuizData });
	} catch (error) {
		console.error("Error fetching quiz data from Prisma:", error);
		return NextResponse.json(
			{ message: "Error fetching quiz data" },
			{ status: 500 }
		);
	}
};
