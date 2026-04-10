import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// Get all videos
router.get('/', async (req: Request, res: Response) => {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// Create video
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, youtubeId, category, isFeatured, description } = req.body;
    const video = await prisma.video.create({
      data: {
        title,
        youtubeId,
        category,
        isFeatured: isFeatured || false,
        description
      }
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create video' });
  }
});

// Delete video
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.video.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

export default router;
