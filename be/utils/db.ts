import sql from 'better-sqlite3';

export const db = sql(process.env.DB_FILE_NAME);
