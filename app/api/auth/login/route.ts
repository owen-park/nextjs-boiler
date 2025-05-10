import { loginController } from "@/be/controllers/authController";
import { LoginRequest } from "@/be/types/authType";

export const POST = async (req: LoginRequest) => {
  const res = await loginController(req);
  return res;
};
