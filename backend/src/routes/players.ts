import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { authenticate } from '../middleware/auth';
import { authorize, checkOwnership } from '../middleware/authorize';

const router = Router();

// Get all players (with search and filter)
router.get('/', authenticate, authorize('SUPER_ADMIN', 'CLUB_ADMIN'), async (req: Request, res: Response) => {
  try {
    const { search, status, specialty } = req.query;
    
    const where: any = {};
    
    // Role-based filtering
    if (req.user?.role === 'CLUB_ADMIN') {
      where.clubId = req.user.clubId;
    }

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
router.post('/', authenticate, authorize('SUPER_ADMIN', 'CLUB_ADMIN'), checkOwnership('player'), async (req: Request, res: Response) => {
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
        clubId: req.user?.role === 'CLUB_ADMIN' ? (req.user.clubId as string) : clubId,
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

// Approve a player (SuperAdmin only)
router.post('/:id/approve', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response) => {
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
