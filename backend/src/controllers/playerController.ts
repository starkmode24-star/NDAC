import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const playerController = {
  create: async (req: Request, res: Response) => {
    try {
      const { userId, clubId, firstName, lastName, dob, aadhaar, address, specialty, ageGroup } = req.body;
      const player = await prisma.player.create({
        data: {
          userId,
          clubId,
          firstName,
          lastName,
          dob: new Date(dob),
          aadhaar,
          address,
          specialty,
          ageGroup,
          status: 'PENDING'
        }
      });
      res.status(201).json(player);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create player' });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const { search, clubId } = req.query;
      
      const where: any = {};
      
      if (search) {
        where.OR = [
          { firstName: { contains: String(search) } },
          { lastName: { contains: String(search) } }
        ];
      }
      
      if (clubId) {
        where.clubId = String(clubId);
      }

      const players = await prisma.player.findMany({
        where,
        include: { 
          club: true,
          user: {
            select: { id: true, email: true }
          }
        }
      });
      res.json(players);
    } catch (error) {
      console.error('Fetch players error:', error);
      res.status(500).json({ error: 'Failed to fetch players', details: (error as Error).message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const player = await prisma.player.findUnique({
        where: { id: String(id) },
        include: { club: true }
      });
      if (!player) return res.status(404).json({ error: 'Player not found' });
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch player' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const player = await prisma.player.update({
        where: { id: String(id) },
        data: req.body
      });
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update player' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.player.delete({ where: { id: String(id) } });
      res.json({ message: 'Player deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete player' });
    }
  },

  approve: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const status = req.body?.status || 'APPROVED';
      const player = await prisma.player.update({
        where: { id: String(id) },
        data: { status }
      });
      res.json(player);
    } catch (error) {
      console.error('Approval error:', error);
      res.status(500).json({ error: 'Failed to update player status' });
    }
  },

  getFeatured: async (req: Request, res: Response) => {
    try {
      const players = await prisma.player.findMany({
        where: { isFeatured: true, status: 'APPROVED' },
        include: { club: true }
      });
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch featured players' });
    }
  }
};
