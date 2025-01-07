import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const articles = await prisma.article.findMany();
        return NextResponse.json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { title, slug, author, date, content, image } = await req.json(); // Ganti banner ke image
    
    try {
        const newArticle = await prisma.article.create({
            data: {
                title,
                slug,
                author,
                date: new Date(date),
                content,
                banner: image, // Jika kolom di database bernama banner, Anda bisa menyesuaikan
            },
        });

        return NextResponse.json(newArticle, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add article' }, { status: 400 });
    }
}
