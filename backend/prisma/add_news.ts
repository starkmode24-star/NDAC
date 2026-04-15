import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.news.create({
    data: {
      title: 'NDCA Annual General Meeting',
      content: 'The 42nd Annual General Meeting of NDCA will be held on June 15th at the Association headquarters.',
      category: 'Association',
      imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800'
    }
  });
  console.log('Added 3rd news item.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
