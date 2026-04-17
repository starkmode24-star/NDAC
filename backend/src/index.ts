import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

// Routes
import authRoutes from './routes/auth';
import playerRoutes from './routes/players';
import clubRoutes from './routes/clubs';
import matchRoutes from './routes/matches';
import leagueRoutes from './routes/leagues';
import newsRoutes from './routes/news';
import galleryRoutes from './routes/gallery';
import dashRoutes from './routes/dashboard';
import trialRoutes from './routes/trials';
import sponsorRoutes from './routes/sponsors';
import broadcastRoutes from './routes/broadcast';

export { prisma } from './lib/prisma';
const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: '*', // Adjust for production
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Main API Routes
app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/leagues', leagueRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/dashboard', dashRoutes);
app.use('/api/trials', trialRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/broadcast', broadcastRoutes);

// Socket Connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
