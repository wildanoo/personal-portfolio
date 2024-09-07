import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil kategori' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    const newCategory = await prisma.category.create({
      data: { name },
    });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat membuat kategori' }, { status: 500 });
  }
}