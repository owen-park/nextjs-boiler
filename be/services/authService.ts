import { NextResponse } from "next/server";
import { LoginRequest, TokenRequest } from "@/be/types/authType";
import { getUser, getPassword, getToken, updateToken, insertToken, verifyToken } from "@/be/models/authModel";
import { createToken } from "@/be/utils/tokenFunction";

export const loginService = async (req: LoginRequest) => {
  const { loginId, password } = await req.json();

  try {
    // 로그인ID 검증
    const userId = await getUser(loginId);

    // 로그인ID 검증 실패 시 에러 응답 반환
    if (!userId) {
      return NextResponse.json({
        status: "ERROR",
        message: "No user",
        data: null,
      });
    }

    // 패스워드 검증
    const passwordId = await getPassword(loginId, password);

    // 패스워드 검증 실패 시 에러 응답 반환
    if (!passwordId) {
      return NextResponse.json({
        status: "ERROR",
        message: "Password is invalid",
        data: null,
      });
    }

    // 토큰 생성
    const accessToken = await createToken({
      payload: { userId: userId },
      expirationTime: '30m',
    });
    const refreshToken = await createToken({
      expirationTime: '7d',
    });

    // 토큰 생성 실패 시 에러 응답 반환
    if (!accessToken || !refreshToken) {
      return NextResponse.json({
        status: "ERROR",
        message: "Token generation failed",
        data: null,
      });
    }

    // 로그인ID에 대한 토큰 조회
    const tokenId = await getToken(userId);

    // 토큰이 이미 존재하면 기존 토큰 업데이트
    if (tokenId) {
      const res = await updateToken(userId, refreshToken);

      // 토큰 업데이트 실패 시 에러 응답 반환
      if (!res) {
        return NextResponse.json({
          status: "ERROR",
          message: "Token update failed",
          data: null,
        });
      }
      // 토큰이 없으면 신규 토큰 저장
    } else {
      const res = await insertToken(userId, refreshToken);

      // 토큰 저장 실패 시 에러 응답 반환
      if (!res) {
        return NextResponse.json({
          status: "ERROR",
          message: "Token insert failed",
          data: null,
        });
      }
    }

    // 쿠키에 토큰 저장하고 성공 응답 반환
    const response = NextResponse.json({
      status: "SUCCESS",
      message: "Successful login",
      data: {
        userId: userId,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
    response.headers.append('Set-Cookie', `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=1800`);
    response.headers.append('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800`);
    return response;
  } catch {
    return NextResponse.json({
      status: "ERROR",
      message: "Failed while processing internal logic",
      data: null,
    });
  }
};

export const tokenService = async (req: TokenRequest) => {
  const { refreshToken } = await req.json();

  // Refresh token이 없으면 에러 코드 반환
  if (!refreshToken) {
    return NextResponse.json({
      status: 'ERROR',
      message: 'No refresh token',
      data: null,
    });
  }

  try {
    // Refresh token 검증
    const verifyRes = await verifyToken(refreshToken);

    // Refresh token가 유효하지 않으면 에러 코드 반환
    if (!verifyRes) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'Refresh token is invalid',
        data: null,
      });
    }

    // Refresh token 검증 (DB)
    const userId = await verifyToken(refreshToken);

    // Refresh token가 유효하지 않으면 에러 코드 반환
    if (!userId) {
      return NextResponse.json({
        status: 'ERROR',
        message: 'Refresh token is invalid',
        data: null,
      });
    }

    // userId를 포함한 성공 응답 반환
    return NextResponse.json({
      status: "SUCCESS",
      message: "Successful refreshing token",
      data: {
        userId: userId,
      },
    });
  } catch {
    return NextResponse.json({
      status: "ERROR",
      message: "Failed while processing internal logic",
      data: null,
    });
  }
};

export const logoutService = async () => {
  try {
    const response = NextResponse.json({
      status: "SUCCESS",
      message: "Successful logout",
      data: null,
    });

    // 쿠키에서 Access Token, Refresh Token 제거
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
  } catch {
    return NextResponse.json({
      status: "ERROR",
      message: "Logout failed",
      data: null,
    });
  }
};
