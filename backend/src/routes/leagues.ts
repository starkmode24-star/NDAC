import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// Get all leagues
router.get('/', async (req: Request, res: Response) => {
  try {
    const leagues = await prisma.league.findMany({
      include: {
        matches: {
          include: { team1: true, team2: true }
        }
      }
    });
    res.json(leagues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leagues' });
  }
});

// Create a league
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, startDate, endDate, season } = req.body;
    const league = await prisma.league.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        season
      }
    });
    res.status(201).json(league);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create league' });
  }
});

// Get league standings
router.get('/:id/standings', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const matches = await (prisma.match as any).findMany({
      where: { leagueId: id as string, status: 'COMPLETED' },
      include: { team1: true, team2: true }
    });

    const standingsMap: Record<string, any> = {};

    matches.forEach((m: any) => {
      [m.team1, m.team2].forEach((team: any) => {
        if (!standingsMap[team.id]) {
          standingsMap[team.id] = { id: team.id, name: team.name, p: 0, w: 0, l: 0, pts: 0 };
        }
      });

      standingsMap[m.team1Id].p += 1;
      standingsMap[m.team2Id].p += 1;

      if (m.result === m.team1Id) {
        standingsMap[m.team1Id].w += 1;
        standingsMap[m.team1Id].pts += 2;
        standingsMap[m.team2Id].l += 1;
      } else if (m.result === m.team2Id) {
        standingsMap[m.team2Id].w += 1;
        standingsMap[m.team2Id].pts += 2;
        standingsMap[m.team1Id].l += 1;
      } else {
        standingsMap[m.team1Id].pts += 1;
        standingsMap[m.team2Id].pts += 1;
      }
    });

    const standings = Object.values(standingsMap).sort((a: any, b: any) => b.pts - a.pts);
    res.json(standings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch standings' });
  }
});

export default router;
