import { logoutController } from "@/be/controllers/authController";

export const POST = async () => {
  return await logoutController();
};
