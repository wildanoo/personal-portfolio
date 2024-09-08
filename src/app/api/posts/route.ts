import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { error: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    const userId = decoded.userId;

    const {
      title,
      content,
      excerpt,
      slug,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      categoryId,
      authorId,
      status,
      visibility,
      publishedOn,
    } = await req.json();

    const uniqueSlug = await prisma.post.findFirst({
      where: { slug: slug },
    });

    if (uniqueSlug) {
      return NextResponse.json(
        { error: "Slug has been used" },
        { status: 400 }
      );
    }

    // Pastikan categoryId valid
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        excerpt,
        slug,
        content,
        authorId,
        categoryId,
        metaTitle,
        metaDescription,
        metaKeywords,
        status,
        visibility,
        publishedOn,
        tagsOnPosts: {
          create: tags.map((tagName: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
            assignedBy: userId,
          })),
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Error occured when create post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const articles = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedArticles = articles.map((article) => ({
      id: article.id,
      title: article.title,
      categoryName: article.category.name,
      createdAt: article.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedArticles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Error occured when fetch article" },
      { status: 500 }
    );
  }
}
