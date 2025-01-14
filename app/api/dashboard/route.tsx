// app/api/dashboard/route.ts

import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";  // Import your prisma client

// Handle GET requests for the dashboard
export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const articleCount = await prisma.article.count();
    const quizCount = await prisma.quiz.count();

    return NextResponse.json({ userCount, articleCount, quizCount });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
