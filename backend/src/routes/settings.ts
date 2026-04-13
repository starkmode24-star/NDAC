import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';

const router = Router();

// Get settings by key
router.get('/:key', async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const setting = await prisma.setting.findUnique({
      where: { key }
    });
    res.json(setting ? JSON.parse(setting.value) : {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update settings (SuperAdmin only)
router.post('/:key', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const value = JSON.stringify(req.body);
    const setting = await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
    res.json(JSON.parse(setting.value));
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;
