import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seed starting...');

  // 1. Create Super Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@ndca.com' },
    update: {},
    create: {
      email: 'admin@ndca.com',
      password: adminPassword,
      role: 'SUPER_ADMIN'
    }
  });

  // 2. Create Clubs
  await Promise.all([
    prisma.club.upsert({
      where: { id: 'club-nashik-stars' },
      update: {},
      create: { id: 'club-nashik-stars', name: 'Nashik Stars', status: 'APPROVED' }
    }),
    prisma.club.upsert({
      where: { id: 'club-panchavati-warriors' },
      update: {},
      create: { id: 'club-panchavati-warriors', name: 'Panchavati Warriors', status: 'APPROVED' }
    })
  ]);

  // 3. Create Leagues
  const league = await prisma.league.create({
    data: {
      name: 'Nashik Premier League 2025',
      startDate: new Date('2025-05-01'),
      endDate: new Date('2025-06-01'),
      season: '2025'
    }
  });

  // 4. Create Matches
  await prisma.match.create({
    data: {
      team1Id: 'club-nashik-stars',
      team2Id: 'club-panchavati-warriors',
      leagueId: league.id,
      date: new Date(),
      venue: 'Nashik District Stadium',
      matchType: 'T20',
      status: 'LIVE',
      team1Score: '145/4 (18.2)',
      team2Score: '142/10 (20.0)',
      result: 'Nashik Stars won by 6 wickets'
    }
  });

  await prisma.match.create({
    data: {
      team1Id: 'club-panchavati-warriors',
      team2Id: 'club-nashik-stars',
      leagueId: league.id,
      date: new Date(Date.now() + 86400000), // Tomorrow
      venue: 'Golf Club Ground',
      matchType: 'T20',
      status: 'UPCOMING'
    }
  });

  // 5. Create News
  const newsItems = [
    { 
      title: 'NPL 2025 Auctions Announced', 
      content: 'Player auctions for the upcoming Nashik Premier League will be held on April 20th.',
      category: 'Tournament',
      imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800'
    },
    { 
      title: 'Under-19 Selection Trials', 
      content: 'Selection trials for the District U-19 team start next Monday at the main stadium.',
      category: 'Selection',
      imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800'
    }
  ];

  for (const item of newsItems) {
    await prisma.news.create({ data: item });
  }

  // 6. Create Sponsors
  const sponsorItems = [
    { name: 'Nashik Bank', tier: 'TITLE', logoUrl: '🏢' },
    { name: 'Sportly', tier: 'ASSOCIATE', logoUrl: '⚽' },
    { name: 'Global Goods', tier: 'PARTNER', logoUrl: '📦' }
  ];

  for (const item of sponsorItems) {
    await prisma.sponsor.create({ data: item });
  }

  // 7. Create Players
  const playerPassword = await bcrypt.hash('player123', 10);
  
  // Player 1
  const user1 = await prisma.user.upsert({
    where: { email: 'rohan.sharma@example.com' },
    update: {},
    create: {
      email: 'rohan.sharma@example.com',
      password: playerPassword,
      role: 'PLAYER'
    }
  });

  await prisma.player.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      clubId: 'club-nashik-stars',
      firstName: 'Rohan',
      lastName: 'Sharma',
      dob: new Date('2005-08-15'),
      aadhaar: '1234-5678-9012',
      address: 'Panchavati, Nashik',
      specialty: 'Top-order Batter',
      ageGroup: 'U-19',
      status: 'APPROVED'
    }
  });

  // Player 2
  const user2 = await prisma.user.upsert({
    where: { email: 'amit.patil@example.com' },
    update: {},
    create: {
      email: 'amit.patil@example.com',
      password: playerPassword,
      role: 'PLAYER'
    }
  });

  await prisma.player.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      clubId: 'club-panchavati-warriors',
      firstName: 'Amit',
      lastName: 'Patil',
      dob: new Date('2007-03-22'),
      aadhaar: '9876-5432-1098',
      address: 'CIDCO, Nashik',
      specialty: 'Right-arm Fast',
      ageGroup: 'U-17',
      status: 'PENDING'
    }
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
