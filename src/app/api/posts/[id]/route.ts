import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const article = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { firstName: true, lastName: true } },
        category: { select: { name: true } },
        tagsOnPosts: { include: { tag: true } },
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
    }

    const formattedArticle = {
      id: article.id,
      title: article.title,
      content: article.content,
      categoryName: article.category.name,
      authorName: `${article.user.firstName} ${article.user.lastName}`,
      createdAt: article.createdAt.toISOString(),
      tags: article.tagsOnPosts.map(top => top.tag.name),
    };

    return NextResponse.json(formattedArticle);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil detail artikel' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, content, categoryId, tags } = await req.json();

    const updatedArticle = await prisma.post.update({
      where: { id: params.id },
      data: {
        title,
        content,
        categoryId,
        tagsOnPosts: {
          deleteMany: {},
          create: tags.map((tagName: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
            assignedBy: 'system', // Ganti dengan ID pengguna yang sesuai jika tersedia
          })),
        },
      },
      include: {
        user: { select: { firstName: true, lastName: true } },
        category: { select: { name: true } },
        tagsOnPosts: { include: { tag: true } },
      },
    });

    const formattedArticle = {
      id: updatedArticle.id,
      title: updatedArticle.title,
      content: updatedArticle.content,
      categoryName: updatedArticle.category.name,
      authorName: `${updatedArticle.user.firstName} ${updatedArticle.user.lastName}`,
      createdAt: updatedArticle.createdAt.toISOString(),
      tags: updatedArticle.tagsOnPosts.map(top => top.tag.name),
    };

    return NextResponse.json(formattedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat memperbarui artikel' }, { status: 500 });
  }
}