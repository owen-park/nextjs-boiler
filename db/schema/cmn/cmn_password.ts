import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2';

export const cmnPasswordTable = sqliteTable("cmn_password", {
  passwordId: text("password_id", { length: 36 }).primaryKey().$defaultFn(() => createId()),
  userId: text("user_id", { length: 36 }),
  userPassword: text("user_password", { length: 200 }).notNull(),
  passwordChangedAt: text("password_changed_at", { length: 30 }).notNull(),
  passwordExpireAt: text("password_expire_at", { length: 30 }),
  loginFailCount: integer("login_fail_count", { mode: 'number' }).default(0),
  inactiveYn: text("inactive_yn", { length: 100 }).notNull().default("N"),
  createdBy: text("created_by", { length: 36 }).notNull(),
  createdAt: text("created_at", { length: 30 }).notNull().default(sql`(DATETIME('now', 'localtime'))`),
  updatedBy: text("updated_by", { length: 36 }).notNull(),
  updatedAt: text("updated_at", { length: 30 }).notNull().default(sql`(DATETIME('now', 'localtime'))`),
});
