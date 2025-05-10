import { getMenuListService } from "@/be/services/menuService";
import { NextRequest } from "next/server";

export const menuController = async (req: NextRequest) => {
  switch (req.method) {
    case 'GET':
      return await getMenuListService();
  }
};
