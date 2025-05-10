import { tokenController } from "@/be/controllers/authController";
import { TokenRequest } from "@/be/types/authType";

export const POST = async (req: TokenRequest) => {
  return await tokenController(req);
};
