import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { authenticate } from '../middleware/auth';
import { authorize, checkOwnership } from '../middleware/authorize';

const router = Router();

// Get all trials (Public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const trials = await prisma.selectionTrial.findMany({
      include: { 
        _count: { select: { registrations: true } },
        registrations: {
          include: { player: true }
        }
      }
    });
    res.json(trials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trials' });
  }
});

// Create a trial (SuperAdmin only)
router.post('/', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response) => {
  try {
    const { title, ageGroup, date, venue } = req.body;
    const trial = await prisma.selectionTrial.create({
      data: {
        title,
        ageGroup,
        date: new Date(date),
        venue,
        status: 'OPEN'
      }
    });
    res.status(201).json(trial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create trial' });
  }
});

// Register a player for a trial (Player or ClubAdmin)
router.post('/:id/register', authenticate, authorize('SUPER_ADMIN', 'CLUB_ADMIN', 'PLAYER'), async (req: Request, res: Response) => {
  try {
    const { id: trialId } = req.params;
    const { playerId } = req.body;
    
    // Ownership check for CLUB_ADMIN/PLAYER
    if (req.user?.role === 'CLUB_ADMIN' || req.user?.role === 'PLAYER') {
       const player = await prisma.player.findUnique({ where: { id: playerId } });
       if (!player || (req.user.role === 'PLAYER' && player.userId !== req.user.userId) || (req.user.role === 'CLUB_ADMIN' && player.clubId !== req.user.clubId)) {
         return res.status(403).json({ error: 'Forbidden: You cannot register this player' });
       }
    }

    const registration = await prisma.trialRegistration.create({
      data: {
        trialId: String(trialId),
        playerId: String(playerId),
        status: 'APPLIED'
      }
    });
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register for trial' });
  }
});

// Update registration status (SuperAdmin only)
router.patch('/registration/:regId', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response) => {
  try {
    const { regId } = req.params;
    const { status, performanceNotes } = req.body;
    
    const updated = await prisma.trialRegistration.update({
      where: { id: String(regId) },
      data: { 
        status,
        performanceNotes
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update registration' });
  }
});

export default router;
