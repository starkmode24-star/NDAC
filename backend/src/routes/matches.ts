import { Router, Request, Response } from 'express';
import { prisma, io } from '../index';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';

const router = Router();

// Get all matches (Public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const matches = await prisma.match.findMany({
      include: { team1: true, team2: true, league: true }
    });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// Create a match (SuperAdmin only)
router.post('/', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response) => {
  try {
    const { team1Id, team2Id, leagueId, date, venue, matchType } = req.body;
    const match = await prisma.match.create({
      data: {
        team1Id,
        team2Id,
        leagueId,
        date: new Date(date),
        venue,
        matchType,
        status: 'UPCOMING'
      }
    });
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule match' });
  }
});

// Update match score (SuperAdmin only)
router.post('/:id/score', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { team1Score, team2Score, result } = req.body;
    const match = await prisma.match.update({
      where: { id: String(id) },
      data: {
        team1Score: team1Score ? String(team1Score) : undefined,
        team2Score: team2Score ? String(team2Score) : undefined,
        result: result ? String(result) : undefined,
        status: result ? 'COMPLETED' : 'LIVE'
      }
    });

    // Emit live update
    io.emit('scoreUpdate', { matchId: id, score: match });

    res.json(match);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update score' });
  }
});

// Add a delivery (SuperAdmin only)
router.post('/:id/ball', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response) => {
  try {
    const { id: matchId } = req.params;
    const { inningsId, over, ball, runs, extras, wicket, batterId, bowlerId, commentary } = req.body;

    // Create the ball entry
    const newBall = await prisma.ballByBall.create({
      data: {
        matchId: String(matchId),
        inningsId: String(inningsId),
        over: Number(over),
        ball: Number(ball),
        runs: Number(runs),
        extras: Number(extras || 0),
        wicket: Boolean(wicket),
        batterId: batterId ? String(batterId) : undefined,
        bowlerId: bowlerId ? String(bowlerId) : undefined,
        commentary
      }
    });

    // Update relevant match/innings stats (simplified)
    const updatedInnings = await prisma.innings.update({
      where: { id: inningsId },
      data: {
        totalRuns: { increment: runs + (extras || 0) },
        totalWickets: { increment: wicket ? 1 : 0 }
      }
    });

    // Emit live update for both the ball and the updated score
    io.emit('ballUpdate', { matchId, ball: newBall, innings: updatedInnings });
    
    res.status(201).json(newBall);
  } catch (error) {
    res.status(500).json({ error: 'Failed to record ball' });
  }
});

export default router;
