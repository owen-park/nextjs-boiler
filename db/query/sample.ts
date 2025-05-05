import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import { cmnUserTable } from '@/db/schema/cmn/cmn_user';
import { cmnPasswordTable } from '../schema/cmn/cmn_password';

const db = drizzle(process.env.DB_FILE_NAME!);

async function main() {
  // insert user
  const user: typeof cmnUserTable.$inferInsert = {
    loginId: 'admin',
    userName: 'admin',
    userStatusCode: 'INACTIVE',
    userEmail: 'admin',
    createdBy: 'SYSTEM',
    updatedBy: 'SYSTEM',
  };
  await db.insert(cmnUserTable).values(user);
  console.log('admin user created');

  // select user
  const userId = await db.select().from(cmnUserTable).where(eq(cmnUserTable.loginId, 'admin'));
  console.log(`user id: ${userId[0].userId}`);

  // insert password
  const password: typeof cmnPasswordTable.$inferInsert = {
    passwordId: createId(),
    userId: userId[0].userId,
    userPassword: 'admin',
    passwordChangedAt: '2025-05-06 10:08:06',
    createdBy: 'SYSTEM',
    updatedBy: 'SYSTEM',
  };
  await db.insert(cmnPasswordTable).values(password);
  console.log('admin user password created');

  // select user (join)
  const users = await db.select().from(cmnUserTable).innerJoin(cmnPasswordTable, eq(cmnUserTable.userId, cmnPasswordTable.userId));
  console.log('Getting all users from the database: ', users);

  // update user
  await db
    .update(cmnUserTable)
    .set({
      userStatusCode: 'ACTIVE',
    })
    .where(eq(cmnUserTable.loginId, user.loginId));
  console.log('admin info updated!');

  // delete
  // await db.delete(cmnUserTable).where(eq(cmnUserTable.user_id, user.user_id));
  // console.log('User deleted!');
};

main();
