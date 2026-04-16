import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const galleryController = {
  create: async (req: Request, res: Response) => {
    try {
      const { title, url, category, type } = req.body;
      const item = await prisma.gallery.create({
        data: { title, url, category, type: type || 'IMAGE' }
      });
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed' });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const items = await prisma.gallery.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.gallery.delete({ where: { id: String(id) } });
      res.json({ message: 'Deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed' });
    }
  }
};
