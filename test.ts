// filepath: /home/programming/ai-mailler/testClient.ts
import { db } from "./src/server/db";

async function testPrisma() {
  // This assumes you have a User model in your Prisma schema
  try {
    // This assumes you have at least one User, or it should return an empty array.
    const users = await db.user.findMany();
    console.log("Users:", users);
  } catch (error) {
    console.error("Error querying users:", error);
  }
}

testPrisma();