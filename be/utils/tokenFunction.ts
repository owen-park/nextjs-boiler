import { SignJWT, jwtVerify } from 'jose';

type TokenParam = {
  payload?: {
    userId: string,
  };
  expirationTime: string;
}

export const createToken = async (param: TokenParam) => {
  const { payload, expirationTime } = param;
  const secretKey = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY);
  
  if (payload) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt(new Date())
      .setExpirationTime(expirationTime)
      .sign(secretKey);
  } else {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt(new Date())
      .setExpirationTime(expirationTime)
      .sign(secretKey);
  }
};

export const verifyToken = async (token: string) => {
  const secretKey = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY);
  try {
    return await jwtVerify(token, secretKey);
  } catch {
    return null;
  }
};
