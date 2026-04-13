import { Request, Response, NextFunction } from 'express';

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: `Forbidden: Access restricted to ${roles.join(', ')}` });
    }

    next();
  };
};

export const checkOwnership = (resourceName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // SuperAdmin bypass
    if (req.user?.role === 'SUPER_ADMIN') {
      return next();
    }

    // For ClubAdmin, check if the resource clubId matches user's clubId
    if (req.user?.role === 'CLUB_ADMIN') {
      // Logic for checking ownership would normally involve a DB lookup, 
      // but if the clubId is passed in params or body, we can check it here.
      // If the resource is something like a Player, we might need a generic way to check.
      
      const targetClubId = req.params.clubId || req.body.clubId || (req.params.id && resourceName === 'club' ? req.params.id : null);
      
      if (targetClubId && targetClubId !== req.user.clubId) {
        return res.status(403).json({ error: 'Forbidden: You do not own this resource' });
      }
    }

    // For Player, ensure they only access their own userId
    if (req.user?.role === 'PLAYER') {
      const targetUserId = req.params.userId || req.params.id;
      if (targetUserId && targetUserId !== req.user.userId) {
        return res.status(403).json({ error: 'Forbidden: You can only access your own data' });
      }
    }

    next();
  };
};
