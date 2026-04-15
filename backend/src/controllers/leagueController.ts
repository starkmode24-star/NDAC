import { Request, Response } from 'express';
import { prisma } from '../index';

export const leagueController = {
  create: async (req: Request, res: Response) => {
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
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const leagues = await prisma.league.findMany({
        include: { _count: { select: { matches: true } } }
      });
      res.json(leagues);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch leagues' });
    }
  },

  getStandings: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const matches = await prisma.match.findMany({
        where: { leagueId: String(id), status: 'COMPLETED' },
        include: { team1: true, team2: true }
      });

      const standings: Record<string, any> = {};

      (matches as any[]).forEach(match => {
        [match.team1, match.team2].forEach(team => {
          if (!standings[team.id]) {
            standings[team.id] = { id: team.id, name: team.name, played: 0, won: 0, lost: 0, points: 0, nrr: 0 };
          }
          standings[team.id].played += 1;
        });

        if (match.result) {
            if (standings[match.result]) {
                standings[match.result].won += 1;
                standings[match.result].points += 2;
            }
            const loserId = match.result === match.team1Id ? match.team2Id : match.team1Id;
            if (standings[loserId]) {
                standings[loserId].lost += 1;
            }
        }
      });

      res.json(Object.values(standings).sort((a, b) => b.points - a.points));
    } catch (error) {
      res.status(500).json({ error: 'Failed' });
    }
  }
};
