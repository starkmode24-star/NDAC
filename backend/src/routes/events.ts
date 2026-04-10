import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// Get all events
router.get('/', async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Create an event
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, date, time, venue, type, status, description } = req.body;
    const event = await prisma.event.create({
      data: {
        title,
        date: new Date(date),
        time,
        venue,
        type,
        status: status || 'UPCOMING',
        description
      }
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Delete an event
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({ where: { id: id as string } });
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;
