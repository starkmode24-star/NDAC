import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// Get all news
router.get('/', async (req: Request, res: Response) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { publishedAt: 'desc' }
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Create a news article
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, content, category, imageUrl } = req.body;
    const article = await prisma.news.create({
      data: {
        title,
        content,
        category,
        imageUrl,
        publishedAt: new Date()
      }
    });
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create news article' });
  }
});

// Delete news
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.news.delete({ where: { id: String(id) } });
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

export default router;
