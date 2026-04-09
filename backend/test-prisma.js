require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Prisma Client initialized successfully");
  try {
    const users = await prisma.user.findMany();
    console.log("Users:", users);
  } catch (e) {
    console.error("Query failed, but client initialized:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
