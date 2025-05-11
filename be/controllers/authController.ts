import { LoginRequest, TokenRequest } from "@/be/types/authType";
import { loginService, tokenService, logoutService } from "../services/authService";

export const loginController = async (req: LoginRequest) => {
  return await loginService(req);
};

export const tokenController = async (req: TokenRequest) => {
  return await tokenService(req);
};

export const logoutController = async () => {
  return await logoutService();
};
