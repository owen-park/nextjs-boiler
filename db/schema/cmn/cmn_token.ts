import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const cmnTokenTable = sqliteTable("cmn_token", {
  tokenId: integer("token_id", { mode: 'number' }).primaryKey({ autoIncrement: true }),
  userId: text("user_id", { length: 36 }),
  refreshToken: text("refresh_token", { length: 1000 }).notNull(),
  refreshTokenExpireAt: text("refresh_token_expire_at", { length: 36 }).notNull().default(sql`(DATETIME('now', '+9 hours', '+7 days'))`),
  createdBy: text("created_by", { length: 36 }).notNull(),
  createdAt: text("created_at", { length: 30 }).notNull().default(sql`(DATETIME('now', 'localtime'))`),
  updatedBy: text("updated_by", { length: 36 }).notNull(),
  updatedAt: text("updated_at", { length: 30 }).notNull().default(sql`(DATETIME('now', 'localtime'))`),
});
