import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    const slugPost = await prisma.post.findFirst({
      where: { slug },
      select: {
        id: true,
        status: true,
      },
    });
    return NextResponse.json(slugPost, { status: 200 });
  } catch (error) {
    console.error("Error find slug:", error);
    return NextResponse.json(
      { error: "Error occured when fetch slug" },
      { status: 500 }
    );
  }
}
