import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { PostStatus, Visibility } from "@prisma/client";
import { z } from "zod";

import { cloudinary } from "@/lib/cloudinary";
import { UploadApiErrorResponse,UploadApiResponse } from "cloudinary";

type UploadResponse = 
  { success: true; result?: UploadApiResponse } | 
  { success: false; error: UploadApiErrorResponse };

const uploadToCloudinary = (
  fileUri: string, fileName: string): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "portfolio-article", // any sub-folder name in your cloud
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  excerpt: z.string(),
  slug: z.string(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  featuredImage: z.instanceof(File),
  authorId: z.string(),
  categoryId: z.string(),
  status: z.nativeEnum(PostStatus),
  visibility: z.nativeEnum(Visibility),
  publishedOn: z.string().transform((str) => new Date(str)),
  tags: z.string().transform((str) => JSON.parse(str) as string[]),
});

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { error: "Token not found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    const userId = decoded.userId;

    const formData = await req.formData();

    const rawData = Object.fromEntries(formData);

    const validatedData = postSchema.parse(rawData);
    const { tags, featuredImage, ...dataPost } = validatedData;

    const uniqueSlug = await prisma.post.findFirst({
      where: { slug: dataPost.slug },
    });

    if (uniqueSlug) {
      return NextResponse.json(
        { error: "Slug has been used" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: dataPost.categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 400 }
      );
    }

    const fileBuffer = await featuredImage.arrayBuffer();
    const mimeType = featuredImage.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString(encoding)

    const fileUri = `data:${mimeType};${encoding},${base64Data}`;
    const resImage = await uploadToCloudinary(fileUri, featuredImage.name);
    if (!resImage.success) {
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 400 }
      );
    }
    const post = await prisma.post.create({
      data: {
        ...dataPost,
        featuredImage: resImage?.result?.url,
        tagsOnPosts: {
          create: tags.map((tagName) => ({
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
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Data invalid", details: error.errors },
        { status: 400 }
      );
    }
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
