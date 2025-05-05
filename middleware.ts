import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

const publicPaths = [
  '/auth/login',
  '/auth/signup',
];

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const isPublicPath = publicPaths.includes(currentPath);
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  if (!isPublicPath && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  if (!isPublicPath && !accessToken && refreshToken) {
    console.log('refresh token');
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public|themes|layout).*)"],
};
