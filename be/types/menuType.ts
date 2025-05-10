export type MenuResponse = {
  menu_code: string;
  parent_menu_code: string;
  menu_name: string;
  menu_url: string;
  menu_icon: string;
};

export type Menu = {
  key: string;
  label: string;
  icon?: string;
  to?: string;
  items?: Menu[];
}
