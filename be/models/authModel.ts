import { db } from "@/be/utils/db";
import { UserResponse, PasswordResponse, TokenResponse } from "@/be/types/authType";
import { dbDateFormat, addDays } from "@/be/utils/dateFunction";

export const getUser = async (loginId: string) => {
  try {
    const res = await db.prepare(
      `
        SELECT user_id
        FROM cmn_user
        WHERE 1 = 1
        AND login_id = ?
        ;
      `
    ).get(loginId) as UserResponse;

    if (!res) {
      return null;
    }

    return res.user_id;
  } catch {
    return null;
  }
};

export const getPassword = async (loginId: string, password: string) => {
  try {
    const res = await db.prepare(
      `
        SELECT cp.password_id
        FROM cmn_password cp
        INNER JOIN cmn_user cu
        ON cp.user_id = cu.user_id
        WHERE 1 = 1
        AND cp.user_password = ?
        AND cu.login_id = ?
        ;
      `
    ).get(password, loginId) as PasswordResponse;

    if (!res) {
      return null;
    }

    return res.password_id;
  } catch {
    return null;
  }
};

export const getToken = async (userId: string) => {
  try {
    const res = await db.prepare(
      `
        SELECT token_id
        FROM cmn_token
        WHERE 1 = 1
        AND user_id = ?
        ;
      `
    ).get(userId) as TokenResponse;

    if (!res) {
      return null;
    }

    return res.token_id;
  } catch {
    return null;
  }
};

export const updateToken = async (userId: string, refreshToken: string) => {
  try {
    db.prepare(
      `
        UPDATE cmn_token
        SET refresh_token = ?,
        refresh_token_expire_at = ?,
        created_by = ?,
        updated_by = ?
        WHERE user_id = ?
        ;
      `
    ).run(refreshToken, dbDateFormat(addDays(new Date(), 7)), userId, userId, userId);
    return true;
  } catch {
    return false;
  }
};

export const insertToken = async (userId: string, refreshToken: string) => {
  try {
    db.prepare(
      `
        INSERT INTO cmn_token (
        user_id,
        refresh_token,
        created_by,
        updated_by
        )
        VALUES (?, ?, ?, ?)
        ;
      `
    ).run(userId, refreshToken, userId, userId);

    return true;
  } catch {
    return false;
  }
};

export const verifyToken = async (refreshToken: string) => {
  try {
    const res = await db.prepare(
      `
        SELECT user_id
        FROM cmn_token
        WHERE 1 = 1
        AND refresh_token = ?
        AND refresh_token_expire_at >= DATETIME('now', 'localtime')
        ;
      `
    ).get(refreshToken) as UserResponse;

    if (!res) {
      return null;
    }

    return res.user_id;
  } catch {
    return null;
  }
}
