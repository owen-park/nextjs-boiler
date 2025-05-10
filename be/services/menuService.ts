import { NextResponse } from "next/server";
import { getMenuList } from "@/be/models/menuModel";
import { Menu } from "@/be/types/menuType";

export const getMenuListService = async () => {
  try {
    const menus = await getMenuList();

    let result: Menu[] = [];
    menus?.forEach((menu) => {
      if (!menu.parent_menu_code) {
        result.push({
          key: menu.menu_code,
          label: menu.menu_name,
          icon: menu.menu_icon ? 'pi pi-fw ' + menu.menu_icon : '',
          to: menu.menu_url ?? '',
        });
      } else {
        result.forEach((item) => {
          if (item.key === menu.parent_menu_code) {
            if (!item.items) {
              item.items = [];
            }
            item.items?.push({
              key: menu.menu_code,
              label: menu.menu_name,
              icon: menu.menu_icon ? 'pi pi-fw ' + menu.menu_icon : '',
              to: menu.menu_url ?? '',
            });
          }
        });
      }
    });
    
    return NextResponse.json({
      status: "SUCCESS",
      message: "Successful getting menu list",
      data: result,
    });
  } catch {
    return NextResponse.json({
      status: "ERROR",
      message: "Failed while processing internal logic",
      data: null,
    });
  }
};
