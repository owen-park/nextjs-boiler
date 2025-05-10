import { LoginRequest, TokenRequest } from "@/be/types/authType";
import { loginService, TokenService } from "../services/authService";

export const loginController = async (req: LoginRequest) => {
  const res = await loginService(req);
  return res;
};

export const TokenController = async (req: TokenRequest) => {
  const res = await TokenService(req);
  return res;
};
