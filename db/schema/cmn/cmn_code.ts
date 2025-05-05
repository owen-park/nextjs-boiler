import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const cmnCodeTable = sqliteTable("cmn_code", {
  commonCode: text("common_code", { length: 100 }).primaryKey(),
  parentCommonCode: text("parent_common_code", { length: 100 }),
  commonCodeName: text("common_code_name", { length: 100 }).notNull(),
  commonCodeDescription: text("common_code_description", { length: 4000 }),
  displaySeq: integer("display_seq", { mode: 'number' }),
  inactiveYn: text("inactive_yn", { length: 100 }).notNull().default("N"),
  createdBy: text("created_by", { length: 36 }).notNull(),
  createdAt: text("created_at", { length: 30 }).notNull().default(sql`(DATETIME('now', 'localtime'))`),
  updatedBy: text("updated_by", { length: 36 }).notNull(),
  updatedAt: text("updated_at", { length: 30 }).notNull().default(sql`(DATETIME('now', 'localtime'))`),
});
