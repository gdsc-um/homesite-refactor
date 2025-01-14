import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Quiz } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type GroupedHistory = {
	[key: string]: {
		quiz: Quiz;
		attempts: number;
		totalScore: number;
		averageScore?: number;
	};
};

export const GET = async (req: NextRequest) => {
	try {
		const user_id = (await getServerSession(authOptions))?.user?.id;
		if (!user_id) {
			return NextResponse.redirect("/auth/login");
		}

		const history = await prisma.quizResult.findMany({
			where: {
				userId: user_id,
			},
			orderBy: {
				createdAt: "desc",
			},
			include: {
				quiz: true,
			},
		});

		const groupedHistory: GroupedHistory = history.reduce((acc, curr) => {
			const key = curr.quizId;
			if (!acc[key]) {
				acc[key] = {
					quiz: curr.quiz,
					attempts: 1,
					totalScore: curr.score,
				};
			} else {
				acc[key].attempts += 1;
				acc[key].totalScore += curr.score;
			}
			return acc;
		}, {} as GroupedHistory);

		// Calculate the average score
		for (const key in groupedHistory) {
			groupedHistory[key].averageScore =
				groupedHistory[key].totalScore / groupedHistory[key].attempts;
		}
		const response = Object.values(groupedHistory).map((item) => ({
			quiz: item.quiz,
			attempts: item.attempts,
			averageScore: item.averageScore,
		}));

		return NextResponse.json({
			success: true,
			data: response,
			status: 200,
		});
	} catch (error) {
		console.log("Error fetching quiz history:", error);
		return NextResponse.json(
			{ error: "Error fetching quiz history" },
			{ status: 500 }
		);
	}
};
