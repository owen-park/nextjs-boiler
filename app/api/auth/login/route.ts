import { loginController } from "@/be/controllers/authController";
import { LoginRequest } from "@/be/types/authType";

export const POST = async (req: LoginRequest) => {
  return await loginController(req);
};
