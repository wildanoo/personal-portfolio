import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      process.env.JWT_SECRET || 'rahasia',
      { expiresIn: '1h' }
    )

    return NextResponse.json({ 
      message: 'Login berhasil', 
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    }, { status: 200 })
  } catch (error) {
    console.error('Error during login:', error)
    return NextResponse.json({ message: 'Terjadi kesalahan saat login' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}