import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

// Login Route
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token payload
    let clubId = undefined;
    if (user.role === 'CLUB_ADMIN') {
      const club = await prisma.club.findUnique({
        where: { adminId: user.id }
      });
      clubId = club?.id;
    } else if (user.role === 'PLAYER') {
      const player = await prisma.player.findUnique({
        where: { userId: user.id }
      });
      clubId = player?.clubId;
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, clubId },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        clubId
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
