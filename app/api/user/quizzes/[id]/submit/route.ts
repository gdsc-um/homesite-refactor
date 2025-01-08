import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Assuming you're using Prisma ORM for database
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Context {
	params: Promise<{
		id: string;
	}>;
}

export const POST = async (req: NextRequest, context: Context) => {
	try {
		const user_id = (await getServerSession(authOptions))?.user?.id;
		if (!user_id) {
			return NextResponse.redirect("/auth/login");
		}

        const { id } = await context.params;
        
		const { score } = await req.json();

		const result = await prisma.quizResult.create({
			data: {
				userId: user_id,
				quizId: id,
				score,
			},
		});

		// Return a success response
		return NextResponse.json(
			{ message: "Quiz result saved successfully", result },
			{ status: 200 }
		);
	} catch (error) {
		console.log("Error saving quiz result:", error);
		return NextResponse.json(
			{ error: "Error saving quiz result" },
			{ status: 500 }
		);
	}
};
