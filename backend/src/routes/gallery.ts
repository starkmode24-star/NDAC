import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// Get all gallery items
router.get('/', async (req: Request, res: Response) => {
  try {
    const items = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery items' });
  }
});

// Add a gallery item (Image or Video)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, url, type, category } = req.body;
    const item = await prisma.gallery.create({
      data: {
        title,
        url,
        type, // 'IMAGE' or 'VIDEO'
        category
      }
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add gallery item' });
  }
});

// Delete a gallery item
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.gallery.delete({ where: { id: String(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

export default router;
