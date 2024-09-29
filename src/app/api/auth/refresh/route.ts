import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const REFRESH_TOKEN_SECRET = process.env.JWT_SECRET as string;
const ACCESS_TOKEN_SECRET = process.env.REFRESH_JWT_SECRET as string;

interface UserPayload {
  id: number;
}

function isUserPayload(
  payload: JwtPayload | string | null
): payload is UserPayload {
  return (payload as UserPayload)?.id != undefined;
}

export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token is missing" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as
      | JwtPayload
      | string;

    if (!isUserPayload(decoded)) {
      return NextResponse.json(
        { message: "Invalid refresh token payload" },
        { status: 403 }
      );
    }

    const accessToken = jwt.sign({ id: decoded.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    return NextResponse.json({ accessToken });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
