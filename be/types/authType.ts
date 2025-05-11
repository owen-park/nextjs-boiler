import { NextRequest } from 'next/server';

export interface LoginRequest extends NextRequest {
  loginId: string;
  password: string;
};

export interface TokenRequest extends NextRequest {
  refreshToken: string;
};

export type UserResponse = {
  user_id: string;
};

export type PasswordResponse = {
  user_password: string;
  password_salt: string;
};

export type TokenResponse = {
  token_id: number;
};
