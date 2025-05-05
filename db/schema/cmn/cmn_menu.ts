import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const cmnMenuTable = sqliteTable("cmn_menu", {
  menuCode: text("menu_code", { length: 100 }).primaryKey(),
  parentMenuCode: text("parent_menu_code", { length: 100 }),
  menuName: text("menu_name", { length: 100 }).notNull(),
  menuIcon: text("menu_icon", { length: 100 }),
  menuLevel: integer("menu_level", { mode: "number" }),
  displaySeq: integer("display_seq", { mode: "number" }),
  inactiveYn: text("inactive_yn", { length: 100 }).notNull().default("N"),
  createdBy: text("created_by", { length: 36 }).notNull(),
  createdAt: text("created_at", { length: 30 }).notNull().default(sql`(DATETIME('now', 'localtime'))`),
  updatedBy: text("updated_by", { length: 36 }).notNull(),
  updatedAt: text("updated_at", { length: 30 }).notNull().default(sql`(DATETIME('now', 'localtime'))`),
});
