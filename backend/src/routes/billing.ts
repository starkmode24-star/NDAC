import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// Get all transactions
router.get('/', async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: 'desc' }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Create manual transaction
router.post('/', async (req: Request, res: Response) => {
  try {
    const { payerName, amount, type, method, status } = req.body;
    const transaction = await prisma.transaction.create({
      data: {
        payerName,
        amount: parseFloat(amount),
        type,
        method,
        status: status || 'PENDING'
      }
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

// Update transaction status (Verify/Flag)
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // VERIFIED, FLAGGED, PENDING
    const transaction = await prisma.transaction.update({
      where: { id: id as string },
      data: { status }
    });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update transaction status' });
  }
});

export default router;
