import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Get all sponsors
router.get('/', async (req: Request, res: Response) => {
  try {
    const sponsors = await prisma.sponsor.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(sponsors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sponsors' });
  }
});

// Create sponsor
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, tier, logoUrl, industry, active } = req.body;
    const sponsor = await prisma.sponsor.create({
      data: {
        name,
        tier,
        logoUrl,
        industry,
        active: active !== undefined ? active : true
      }
    });
    res.status(201).json(sponsor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sponsor' });
  }
});

// Update sponsor
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { name, tier, logoUrl, industry, active } = req.body;
    const sponsor = await prisma.sponsor.update({
      where: { id },
      data: { name, tier, logoUrl, industry, active }
    });
    res.json(sponsor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sponsor' });
  }
});

// Delete sponsor
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    await prisma.sponsor.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sponsor' });
  }
});

export default router;
