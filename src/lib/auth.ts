import { parseCookies } from "nookies";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'

export interface CustomJwtPayload extends JwtPayload {
  userId?: string;
  email?: string;
  exp?: number;
  iat?: number;
  firstName?: string;
  lastName?: string;
}

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

const prisma = new PrismaClient();

export const userFromToken = (): CustomJwtPayload | unknown => {
  const cookies = parseCookies();
  const token = cookies.session;
  if (token) {
    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      if (decodedToken) {
        return decodedToken;
      }
    } catch (error) {
      return error;
    }
  }
};

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h") // Ubah menjadi 1 jam
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validasi input
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password is required" },
      { status: 400 }
    );
  }

  // Cari user berdasarkan email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Wrong email or password" },
      { status: 400 }
    );
  }

  // Verifikasi password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Wrong email or password" },
      { status: 400 }
    );
  }

  const credential = {
    userId: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  
  const expires = new Date(Date.now() + 3600 * 1000); // 1 jam
  const session = await encrypt(credential);

  cookies().set("session", session, { expires, httpOnly: true });
  return NextResponse.json({ message: "Login successful" }, { status: 200 });
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 3600 * 1000); // Perpanjang 1 jam
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
