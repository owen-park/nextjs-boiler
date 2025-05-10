import { db } from "@/be/utils/db";
import { MenuResponse } from "@/be/types/menuType";

export const getMenuList = async () => {
  try {
    const res = db.prepare(
      `
        SELECT 
          menu_code,
          parent_menu_code,
          menu_name,
          menu_url,
          menu_icon
        FROM cmn_menu
        WHERE 1 = 1
        AND inactive_yn = 'N'
        ORDER BY menu_level, display_seq
        ;
      `
    ).all() as MenuResponse[];

    if (!res) {
      return null;
    }

    return res;
  } catch {
    return null;
  }
};