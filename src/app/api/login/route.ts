import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie';

const REFRESH_TOKEN_SECRET = process.env.JWT_SECRET as string;
const ACCESS_TOKEN_SECRET = process.env.REFRESH_JWT_SECRET as string;

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    // Validasi input
    if (!email || !password) {
      return NextResponse.json({ message: 'Email dan password harus diisi' }, { status: 400 })
    }

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 400 })
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 400 })
    }

    // Buat token JWT
    const accessToken = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      process.env.JWT_SECRET || 'rahasia',
      { expiresIn: '15m' }
    )
    const refreshToken = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      process.env.REFRESH_JWT_SECRET || 'rahasia',
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({accessToken})

    response.headers.set('Set-Cookie', serialize('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    }));

    return response;
  } catch (error) {
    console.error('Error during login:', error)
    return NextResponse.json({ message: 'Terjadi kesalahan saat login' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}