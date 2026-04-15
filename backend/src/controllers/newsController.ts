import { Request, Response } from 'express';
import { prisma } from '../index';

export const newsController = {
  create: async (req: Request, res: Response) => {
    try {
      const { title, content, category, imageUrl } = req.body;
      const news = await prisma.news.create({
        data: { title, content, category, imageUrl }
      });
      res.status(201).json(news);
    } catch (error) {
      res.status(500).json({ error: 'Failed' });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const news = await prisma.news.findMany({
        orderBy: { publishedAt: 'desc' }
      });
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: 'Failed' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.news.delete({ where: { id: String(id) } });
      res.json({ message: 'News deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed' });
    }
  }
};
