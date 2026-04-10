import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// Get all trials
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

// Create a trial
router.post('/', async (req: Request, res: Response) => {
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

// Register a player for a trial
router.post('/:id/register', async (req: Request, res: Response) => {
  try {
    const { id: trialId } = req.params;
    const { playerId } = req.body;
    
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

// Update registration status (Shortlist/Select)
router.patch('/registration/:regId', async (req: Request, res: Response) => {
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
