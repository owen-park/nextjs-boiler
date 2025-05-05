import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2';

export const cmnUserTable = sqliteTable("cmn_user", {
  userId: text("user_id", { length: 36 }).primaryKey().$defaultFn(() => createId()),
  loginId: text("login_id", { length: 50 }).notNull().unique(),
  userName: text("user_name", { length: 100 }).notNull(),
  userStatusCode: text("user_status_code", { length: 30 }).notNull(),
  userEmail: text("user_email", { length: 50 }).unique(),
  userExpireAt: text("user_expire_at", { length: 30 }),
  createdBy: text("created_by", { length: 36 }).notNull(),
  createdAt: text("created_at", { length: 30 }).notNull().default(sql`(DATETIME('now', 'localtime'))`),
  updatedBy: text("updated_by", { length: 36 }).notNull(),
  updatedAt: text("updated_at", { length: 30 }).notNull().default(sql`(DATETIME('now', 'localtime'))`),
});
