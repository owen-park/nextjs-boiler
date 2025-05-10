const sql = require('better-sqlite3');
const db = sql('sqlite.db');

// 사용자 테이블
db.prepare(
  `
    DROP TABLE IF EXISTS cmn_user;
  `
).run();

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS cmn_user (
      user_id VARCHAR(36) PRIMARY KEY DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))),
      login_id VARCHAR(50) NOT NULL UNIQUE,
      user_name VARCHAR(100) NOT NULL,
      user_status_code VARCHAR(30) NOT NULL,
      user_email VARCHAR(50) NULL UNIQUE,
      user_expire_at VARCHAR(30) NULL,
      created_by VARCHAR(36) NOT NULL DEFAULT ('00000000-0000-0000-0000-000000000000'),
      created_at VARCHAR(30) NOT NULL DEFAULT (DATETIME('now', 'localtime')),
      updated_by VARCHAR(36) NOT NULL DEFAULT ('00000000-0000-0000-0000-000000000000'),
      updated_at VARCHAR(30) NOT NULL DEFAULT (DATETIME('now', 'localtime'))
    );
  `
).run();

db.prepare(
  `
    INSERT INTO cmn_user (
      login_id,
      user_name,
      user_status_code
    )
    VALUES (
      'admin',
      'admin',
      'ACTIVE'
    );
  `
).run();

// 패스워드 테이블
db.prepare(
  `
    DROP TABLE IF EXISTS cmn_password;
  `
).run();

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS cmn_password (
      password_id VARCHAR(36) PRIMARY KEY DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))),
      user_id VARCHAR(36) NOT NULL,
      user_password VARCHAR(200) NOT NULL,
      password_changed_at VARCHAR(30) NULL,
      password_expire_at VARCHAR(30) NULL,
      login_fail_count TINYINT DEFAULT (0),
      created_by VARCHAR(36) NOT NULL DEFAULT ('00000000-0000-0000-0000-000000000000'),
      created_at VARCHAR(30) NOT NULL DEFAULT (DATETIME('now', 'localtime')),
      updated_by VARCHAR(36) NOT NULL DEFAULT ('00000000-0000-0000-0000-000000000000'),
      updated_at VARCHAR(30) NOT NULL DEFAULT (DATETIME('now', 'localtime'))
    );
  `
).run();

const userId = db.prepare(
  `
    SELECT user_id from cmn_user where login_id = ?;
  `
).get('admin');

db.prepare(
  `
    INSERT INTO cmn_password (
      user_id,
      user_password
    )
    VALUES (
      ?,
      ?
    );
  `
).run(userId.user_id, 'admin');

// 토큰 테이블
db.prepare(
  `
    DROP TABLE IF EXISTS cmn_token;
  `
).run();

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS cmn_token (
      token_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id VARCHAR(36) NOT NULL,
      refresh_token VARCHAR(1000) NOT NULL,
      refresh_token_expire_at VARCHAR(30) NOT NULL DEFAULT (DATETIME('now', '+9 hours', '+7 days')),
      created_by VARCHAR(36) NOT NULL DEFAULT ('00000000-0000-0000-0000-000000000000'),
      created_at VARCHAR(30) NOT NULL DEFAULT (DATETIME('now', 'localtime')),
      updated_by VARCHAR(36) NOT NULL DEFAULT ('00000000-0000-0000-0000-000000000000'),
      updated_at VARCHAR(30) NOT NULL DEFAULT (DATETIME('now', 'localtime'))
    );
  `
).run();

// 메뉴 테이블
db.prepare(
  `
    DROP TABLE IF EXISTS cmn_menu;
  `
).run();

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS cmn_menu (
      menu_code VARCHAR(100) PRIMARY KEY,
      parent_menu_code VARCHAR(100) NULL,
      menu_name VARCHAR(100) NOT NULL,
      menu_url VARCHAR(1000) NULL,
      menu_icon VARCHAR(100) NULL,
      menu_level INTEGER NULL,
      display_seq INTEGER NULL,
      inactive_yn VARCHAR(1) NOT NULL DEFAULT ('N'),
      created_by VARCHAR(36) NOT NULL DEFAULT ('00000000-0000-0000-0000-000000000000'),
      created_at VARCHAR(30) NOT NULL DEFAULT (DATETIME('now', 'localtime')),
      updated_by VARCHAR(36) NOT NULL DEFAULT ('00000000-0000-0000-0000-000000000000'),
      updated_at VARCHAR(30) NOT NULL DEFAULT (DATETIME('now', 'localtime'))
    );
  `
).run();

db.prepare(
  `
    INSERT INTO cmn_menu (menu_code, menu_name, menu_level, display_seq) VALUES ('HOME', 'Home', 0, 0);
  `
).run();
db.prepare(
  `
    INSERT INTO cmn_menu (menu_code, parent_menu_code, menu_name, menu_url, menu_icon, menu_level, display_seq) VALUES ('HOME_DASHBOARD', 'HOME', 'Dashboard', '/', 'pi-home', 1, 0);
  `
).run();
