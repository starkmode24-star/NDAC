import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// Generation of simple CSV reports
router.get('/export/:type', async (req: Request, res: Response) => {
  try {
    const { type } = req.params; // players, clubs, matches
    let data: any[] = [];
    let headers: string[] = [];

    if (type === 'players') {
      data = await prisma.player.findMany({ include: { club: true } });
      headers = ['ID', 'First Name', 'Last Name', 'DOB', 'Club', 'Status'];
    } else if (type === 'clubs') {
      data = await prisma.club.findMany();
      headers = ['ID', 'Name', 'Status', 'Created At'];
    } else if (type === 'matches') {
      data = await prisma.match.findMany({ include: { team1: true, team2: true } });
      headers = ['ID', 'Team 1', 'Team 2', 'Venue', 'Date', 'Status'];
    }

    // Convert to CSV string
    const csvRows = [headers.join(',')];
    data.forEach(item => {
      if (type === 'players') {
        csvRows.push(`${item.id},${item.firstName},${item.lastName},${item.dob},${item.club.name},${item.status}`);
      } else if (type === 'clubs') {
        csvRows.push(`${item.id},${item.name},${item.status},${item.createdAt}`);
      } else if (type === 'matches') {
        csvRows.push(`${item.id},${item.team1.name},${item.team2.name},${item.venue},${item.date},${item.status}`);
      }
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=ndca_${type}_report.csv`);
    res.status(200).send(csvRows.join('\n'));

  } catch (error) {
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

export default router;
