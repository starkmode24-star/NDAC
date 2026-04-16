import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

router.get('/stats', async (req: Request, res: Response) => {
  try {
    const totalPlayers = await prisma.player.count();
    const activeClubs = await prisma.club.count({ where: { status: 'APPROVED' } });
    
    // Matches today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const matchesToday = await prisma.match.count({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    });

    const pendingPlayers = await prisma.player.count({ where: { status: 'PENDING' } });
    const pendingClubs = await prisma.club.count({ where: { status: 'PENDING' } });
    const pendingApprovals = pendingPlayers + pendingClubs;

    // Recent Activity (we'll fetch latest matches, clubs, players as proxy)
    const latestClubs = await prisma.club.findMany({ 
      orderBy: { createdAt: 'desc' }, 
      take: 2,
      select: { id: true, name: true, createdAt: true, status: true }
    });
    
    const latestMatches = await prisma.match.findMany({ 
      orderBy: { createdAt: 'desc' }, 
      take: 2,
      include: { team1: true, team2: true }
    });

    const recentActivity: any[] = [];
    latestClubs.forEach((club: any) => {
      recentActivity.push({
        id: `club-${club.id}`,
        type: 'Registration',
        title: `Club: ${club.name}`,
        time: club.createdAt,
        status: club.status
      });
    });

    latestMatches.forEach((match: any) => {
      recentActivity.push({
        id: `match-${match.id}`,
        type: 'Match',
        title: `${match.team1.name} vs ${match.team2.name}`,
        time: match.createdAt,
        status: match.status
      });
    });

    // Sort by time
    recentActivity.sort((a, b) => b.time.getTime() - a.time.getTime());

    // Fake traffic data for now since we don't track logins
    const trafficData = [
      { name: 'Mon', score: 4000 },
      { name: 'Tue', score: 3000 },
      { name: 'Wed', score: 5000 },
      { name: 'Thu', score: 2780 },
      { name: 'Fri', score: 1890 },
      { name: 'Sat', score: 2390 },
      { name: 'Sun', score: 3490 },
    ];

    res.json({
      totalPlayers,
      activeClubs,
      matchesToday,
      pendingApprovals,
      recentActivity: recentActivity.slice(0, 5),
      trafficData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;
