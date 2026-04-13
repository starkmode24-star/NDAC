import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';
import { generatePDF } from '../utils/pdfGenerator';

const router = Router();

// Get PDF player report (SuperAdmin only)
router.get('/players/pdf', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response) => {
  try {
    const players = await prisma.player.findMany({
      include: { club: true }
    });

    const reportData = players.map(p => ({
      name: `${p.firstName} ${p.lastName}`,
      age: new Date().getFullYear() - new Date(p.dob).getFullYear(),
      club: p.club.name,
      role: p.specialty || 'N/A',
      status: p.status
    }));

    const columns = [
      { header: 'NAME', key: 'name', width: 140 },
      { header: 'AGE', key: 'age', width: 50 },
      { header: 'CLUB', key: 'club', width: 140 },
      { header: 'ROLE', key: 'role', width: 100 },
      { header: 'STATUS', key: 'status', width: 65 }
    ];

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=ndca_player_report.pdf');

    generatePDF(res, 'OFFICIAL PLAYER DIRECTORY', columns, reportData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate PDF report' });
  }
});

// Get PDF matches report (SuperAdmin only)
router.get('/matches/pdf', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response) => {
  try {
    const matches = await prisma.match.findMany({
      include: { team1: true, team2: true, league: true }
    });

    const reportData = matches.map(m => ({
      date: new Date(m.date).toLocaleDateString(),
      match: `${m.team1.name} vs ${m.team2.name}`,
      venue: m.venue,
      type: m.matchType,
      status: m.status
    }));

    const columns = [
      { header: 'DATE', key: 'date', width: 80 },
      { header: 'MATCHUP', key: 'match', width: 180 },
      { header: 'VENUE', key: 'venue', width: 100 },
      { header: 'FORM', key: 'type', width: 60 },
      { header: 'STATUS', key: 'status', width: 75 }
    ];

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=ndca_match_schedule.pdf');

    generatePDF(res, 'OFFICIAL MATCH SCHEDULE', columns, reportData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate PDF report' });
  }
});

// Generation of simple CSV reports (SuperAdmin only)
router.get('/export/:type', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response) => {
  try {
    const { type } = req.params; // players, clubs, matches
    let data: any[] = [];
    let headers: string[] = [];

    if (type === 'players') {
      data = await (prisma.player as any).findMany({ include: { club: true } });
      headers = ['ID', 'First Name', 'Last Name', 'DOB', 'Club', 'Status'];
    } else if (type === 'clubs') {
      data = await (prisma.club as any).findMany();
      headers = ['ID', 'Name', 'Status', 'Created At'];
    } else if (type === 'matches') {
      data = await (prisma.match as any).findMany({ include: { team1: true, team2: true } });
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
