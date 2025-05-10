import { TokenController } from "@/be/controllers/authController";
import { TokenRequest } from "@/be/types/authType";

export const POST = async (req: TokenRequest) => {
  const res = await TokenController(req);
  return res;
};
