import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { io } from '../index';

export const matchController = {
  create: async (req: Request, res: Response) => {
    try {
      const { team1Id, team2Id, leagueId, date, venue, matchType } = req.body;
      const match = await prisma.match.create({
        data: {
          team1Id,
          team2Id,
          leagueId,
          date: new Date(date),
          venue,
          matchType,
          status: 'UPCOMING'
        }
      });
      res.status(201).json(match);
    } catch (error) {
      res.status(500).json({ error: 'Failed to schedule match' });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const { status } = req.query;
      const matches = await prisma.match.findMany({
        where: status ? { status: String(status) } : {},
        include: { team1: true, team2: true, league: true }
      });
      res.json(matches);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch matches' });
    }
  },

  getLive: async (req: Request, res: Response) => {
    try {
      const matches = await prisma.match.findMany({
        where: { status: 'LIVE' },
        include: { team1: true, team2: true, league: true }
      });
      res.json(matches);
    } catch (error) {
      res.status(500).json({ error: 'Failed' });
    }
  },

  getUpcoming: async (req: Request, res: Response) => {
    try {
      const matches = await prisma.match.findMany({
        where: { status: 'UPCOMING' },
        include: { team1: true, team2: true, league: true }
      });
      res.json(matches);
    } catch (error) {
      res.status(500).json({ error: 'Failed' });
    }
  },

  getResults: async (req: Request, res: Response) => {
    try {
      const matches = await prisma.match.findMany({
        where: { status: 'COMPLETED' },
        include: { team1: true, team2: true, league: true }
      });
      res.json(matches);
    } catch (error) {
      res.status(500).json({ error: 'Failed' });
    }
  },

  updateScore: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { team1Score, team2Score, result, status } = req.body;
      const match = await prisma.match.update({
        where: { id: String(id) },
        data: {
          team1Score: team1Score?.toString(),
          team2Score: team2Score?.toString(),
          result,
          status: (status as string) || (result ? 'COMPLETED' : 'LIVE')
        },
        include: { team1: true, team2: true }
      });

      // Emit live update
      io.emit('scoreUpdate', { matchId: String(id), score: match });

      res.json(match);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update score' });
    }
  },

  recordBall: async (req: Request, res: Response) => {
      try {
          const { id } = req.params;
          const { inningsId, over, ball, runs, extras, wicket, commentary } = req.body;
          
          const newBall = await prisma.ballByBall.create({
              data: {
                  matchId: String(id),
                  inningsId,
                  over,
                  ball,
                  runs,
                  extras: extras || 0,
                  wicket: wicket || false,
                  commentary
              }
          });

          // Update innings total
          await prisma.innings.update({
              where: { id: String(inningsId) },
              data: {
                  totalRuns: { increment: runs + (extras || 0) },
                  totalWickets: { increment: wicket ? 1 : 0 },
                  overs: over + (ball / 10) // Rough over calc
              }
          });

          io.emit('ballUpdate', { matchId: String(id), ball: newBall });
          res.status(201).json(newBall);
      } catch (error) {
          res.status(500).json({ error: 'Failed' });
      }
  }
};
