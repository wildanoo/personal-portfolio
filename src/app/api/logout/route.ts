import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Logout berhasil' })
  response.cookies.set('session', '', { 
    httpOnly: true, 
    expires: new Date(0),
    sameSite: 'strict',
    path: '/'
  })
  
  return response
}