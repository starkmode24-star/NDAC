import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Adjust for production
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 5000;
export const prisma = new PrismaClient();

// Socket.io connection logic
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Export io to be used in routes
export { io };

import authRoutes from './routes/auth';
import playerRoutes from './routes/players';
import clubRoutes from './routes/clubs';
import matchRoutes from './routes/matches';
import leagueRoutes from './routes/leagues';
import galleryRoutes from './routes/gallery';
import trialRoutes from './routes/trials';
import newsRoutes from './routes/news';
import dashboardRoutes from './routes/dashboard';
import billingRoutes from './routes/billing';
import eventsRoutes from './routes/events';
import sponsorRoutes from './routes/sponsors';
import videoRoutes from './routes/videos';
import settingsRoutes from './routes/settings';
import reportRoutes from './routes/reports';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/leagues', leagueRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/trials', trialRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/reports', reportRoutes);

// Basic Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'NDCA Backend API is running' });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

// Start Server
httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
