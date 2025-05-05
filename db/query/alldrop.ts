import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

type Table = {
  name: string;
};

const db = drizzle(process.env.DB_FILE_NAME!);

async function main() {
  try {
    const tables: Table[] = await db.all(`
      SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
    `);

    for (const table of tables) {
      const tableName = table.name;
      await db.run(`
        DROP TABLE IF EXISTS ${tableName}
      `);
      console.log(`Table ${tableName} deleted`);
    }

    console.log('All tables deleted successfully');
  } catch (error) {
    console.error('An error occurred:', error);
  } 
};

main();
