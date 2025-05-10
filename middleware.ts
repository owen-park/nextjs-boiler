import { NextRequest, NextResponse } from "next/server";
import baseFetchApi from "./fe/utils/baseFetchApi";
import { createToken, verifyToken } from "./be/utils/tokenFunction";

const publicPaths = [
  '/auth/login',
  '/api/auth/login',
];

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  const isPublicPath = publicPaths.includes(currentPath);
  const isApiPath = currentPath.startsWith('/api');
  const accessToken = req.cookies.get('accessToken');
  const refreshToken = req.cookies.get('refreshToken');

  if (isApiPath) {
    // Public API가 아닌 경우
    if (!isPublicPath) {
      // Access Token 검증
      const accessTokenVerify = await verifyToken(accessToken?.value || '');
      
      // Access Token 검증 실패 시 에러 응답 반환
      if (!accessTokenVerify) {
        return NextResponse.json({
          status: 'ERROR',
          message: 'Authorization failed',
          data: null,
        })
      }
    }
  } else {
    // Access Token, Refresh Token이 모두 있는 경우 (Public Path 제외)
    if (!isPublicPath && accessToken && refreshToken) {
      // Access Token 검증
      const verifyRes = await verifyToken(accessToken?.value || '');

      // // Access Token 검증 실패 시 로그인 화면으로 이동
      if (!verifyRes) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
    }

    // Access Token, Refresh Token이 모두 없는 경우 (Public Path 제외)
    if (!isPublicPath && !accessToken && !refreshToken) {
      // 로그인 화면으로 이동
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Refresh Token만 있는 경우 (Public Path 제외)
    if (!isPublicPath && !accessToken && refreshToken) {
      try {
        // Refresh Token 검증
        const { status, data } = await baseFetchApi(`${process.env.BASE_API_URL}/api/auth/token`, {
          method: 'POST',
          body: { refreshToken: refreshToken.value },
        });

        // Refresh Token 검증 실패 시 로그인 화면으로 이동
        if (status === 'ERROR' || !data || !data.userId) {
          return NextResponse.redirect(new URL('/auth/login', req.url));
        }

        // Access Token 생성
        const newAccessToken = await createToken({ 
          payload: { userId: data.userId },
          expirationTime: '30m',
        });

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
  }
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|themes|layout|demo).*)"],
};
