import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { authenticate } from '../middleware/auth';
import { authorize, checkOwnership } from '../middleware/authorize';

const router = Router();

// Get all clubs (Public or Protected?)
router.get('/', async (req: Request, res: Response) => {
  try {
    const clubs = await prisma.club.findMany({
      include: { players: true }
    });
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
});

// Get single club (Owner or SuperAdmin)
router.get('/:id', authenticate, checkOwnership('club'), async (req: Request, res: Response) => {
  try {
    const club = await prisma.club.findUnique({
      where: { id: req.params.id },
      include: { players: true }
    });
    res.json(club);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch club' });
  }
});

// Create a new club (SuperAdmin only)
router.post('/', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response) => {
  try {
    const { name, adminEmail, adminPassword } = req.body;
    
    // Create club admin user
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        password: adminPassword,
        role: 'CLUB_ADMIN'
      }
    });

    // Create the club
    const club = await prisma.club.create({
      data: {
        name,
        adminId: adminUser.id
      }
    });

    res.status(201).json(club);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create club' });
  }
});

export default router;
