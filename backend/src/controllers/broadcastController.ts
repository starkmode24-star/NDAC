import { Request, Response } from 'express';
import { io } from '../index';

export const broadcastController = {
  send: async (req: Request, res: Response) => {
    try {
      const { title, message, target } = req.body;
      
      // Emit socket event for real-time frontend alerts
      io.emit('systemAlert', {
        title,
        message,
        target,
        timestamp: new Date()
      });

      console.log(`Broadcast sent: ${title} to ${target}`);
      
      res.json({ success: true, message: 'Broadcast deployed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Broadcast failed' });
    }
  }
};
