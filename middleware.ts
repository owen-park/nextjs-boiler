import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

const publicPaths = [
  '/auth/login',
  '/auth/signup',
];

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  const isPublicPath = publicPaths.includes(currentPath);
  const accessToken = req.cookies.get('accessToken');
  const refreshToken = req.cookies.get('refreshToken');

  if (!isPublicPath && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  
  if (!isPublicPath && !accessToken && refreshToken) {
    try {
      const param = { refreshToken: refreshToken.value };
      
      const res = await fetch('http://localhost:3000/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
      });
      
      const { status, data } = await res.json();

      if (status === 'ERROR' || !data || !data.userId) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }

      // Access Token 생성
      const secretKey = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY);
      const newAccessToken = await new SignJWT({ userId: data.userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt(new Date())
        .setExpirationTime('30m')
        .sign(secretKey);

      // 쿠키에 Access Token 저장하고 응답 반환
      const response = NextResponse.next();
      response.cookies.set({
        name: 'accessToken',
        value: newAccessToken,
        httpOnly: true,
        path: '/',
        maxAge: 1800,
      });
      return response;
    } catch {
     return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|themes|layout|demo).*)"],
};
