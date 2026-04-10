import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// Get all players (with search and filter)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, status, specialty } = req.query;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { firstName: { contains: String(search), mode: 'insensitive' } },
        { lastName: { contains: String(search), mode: 'insensitive' } },
      ];
    }
    
    if (status) where.status = status;
    if (specialty) where.specialty = specialty;

    const players = await prisma.player.findMany({
      where,
      include: { club: true }
    });
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

// Create a new player
router.post('/', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, clubId, dob, aadhaar, specialty, ageGroup } = req.body;
    
    // First create the user
    const newUser = await prisma.user.create({
      data: {
        email,
        password, // In a real app, hash this!
        role: 'PLAYER'
      }
    });

    // Then create the player profile
    const player = await prisma.player.create({
      data: {
        userId: newUser.id,
        clubId,
        firstName,
        lastName,
        dob: new Date(dob),
        aadhaar,
        specialty,
        ageGroup
      }
    });

    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create player' });
  }
});

// Approve a player
router.post('/:id/approve', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const player = await prisma.player.update({
      where: { id: String(id) },
      data: { status: 'APPROVED' }
    });
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve player' });
  }
});

export default router;
