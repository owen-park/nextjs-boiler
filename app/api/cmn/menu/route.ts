import { menuController } from "@/be/controllers/menuController";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  return await menuController(req);
};
