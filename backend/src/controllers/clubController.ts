import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

export const clubController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name, location, adminEmail, adminPassword } = req.body;
      let adminId = req.body.adminId;

      // If user provided adminEmail and adminPassword from the UI
      if (adminEmail && adminPassword) {
        let user = await prisma.user.findUnique({ where: { email: adminEmail } });
        
        if (!user) {
          const hashedPassword = await bcrypt.hash(adminPassword, 10);
          user = await prisma.user.create({
            data: {
              email: adminEmail,
              password: hashedPassword,
              role: 'CLUB_ADMIN'
            }
          });
        }
        adminId = user.id;
      }

      const club = await prisma.club.create({
        data: { name, location, adminId }
      });
      res.status(201).json(club);
    } catch (error) {
      console.error('Club creation error:', error);
      res.status(500).json({ error: 'Failed to create club' });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const clubs = await prisma.club.findMany({
        include: { admin: true, _count: { select: { players: true } } }
      });
      
      const mappedClubs = clubs.map(club => ({
         ...club,
         // Map _count.players to an array of that length so club.players?.length works
         players: new Array(club._count.players).fill({})
      }));
      res.json(mappedClubs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch clubs' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const club = await prisma.club.update({
        where: { id: String(id) },
        data: req.body
      });
      res.json(club);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update club' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.club.delete({ where: { id: String(id) } });
      res.json({ message: 'Club deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete club' });
    }
  }
};
