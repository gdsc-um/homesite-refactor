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
  const { title, slug, author, date, content, banner } = await req.json();

  try {
    // Cek apakah slug sudah ada di database
    const existingArticle = await prisma.article.findUnique({
      where: { slug },
    });

    if (existingArticle) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }

    // Jika slug tidak ada, lanjutkan dengan menambahkan artikel
    const newArticle = await prisma.article.create({
      data: {
        title,
        slug,
        author,
        date: new Date(date),
        content,
        banner,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to add article' }, { status: 500 });
  }
}

