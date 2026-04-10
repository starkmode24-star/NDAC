import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// Get all clubs
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

// Create a new club
router.post('/', async (req: Request, res: Response) => {
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
