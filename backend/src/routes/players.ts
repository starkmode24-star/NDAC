import { Router } from 'express';
import { playerController } from '../controllers/playerController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';

const router = Router();

// Public/Authenticated access to list and get players
router.get('/', authenticate, playerController.getAll);
router.get('/:id', authenticate, playerController.getById);

// Club Admin or Super Admin can create players
router.post('/', authenticate, authorize('SUPER_ADMIN', 'CLUB_ADMIN'), playerController.create);

// Update player data
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'CLUB_ADMIN'), playerController.update);

// Super Admin only actions
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), playerController.delete);
router.post('/:id/approve', authenticate, authorize('SUPER_ADMIN'), playerController.approve);

export default router;
