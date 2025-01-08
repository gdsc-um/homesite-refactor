import { prisma } from '@/lib/prisma'; 
import { NextResponse } from 'next/server';

// Handler untuk metode GET
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const article = await prisma.article.findUnique({
      where: { slug: slug },
    });

    if (!article) {
      return new Response(
        JSON.stringify({ message: 'Article not found' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Something went wrong' }),
      { status: 500 }
    );
  }
}



export async function PUT(req: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;
    const { title, author, date, content, banner } = await req.json();
    // const newFormDateYYYYMMDD = new Date(date).toISOString().split('T')[0];
    // console.log( title, author, date, content, banner);
    try {
        const updatedArticle = await prisma.article.update({
            where: { slug },
            data: {
                title,
                author,
                date : new Date(date),
                content,
                banner,
            },
        });
        return NextResponse.json(updatedArticle);
    } catch (error) {
        return NextResponse.json({ error: 'Article update failed' }, { status: 400 });
    }
}


// Handler untuk metode DELETE
export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;

    try {
        // Hapus artikel berdasarkan slug
        const deletedArticle = await prisma.article.delete({
            where: { slug },
        });
        return NextResponse.json({ message: 'Article deleted successfully', article: deletedArticle });
        
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete article' }, { status: 400 });
    }
}
