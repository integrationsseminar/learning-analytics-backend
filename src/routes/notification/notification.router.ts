import { Router } from 'express';
import authMiddleware from '../../middleware/auth.middleware';
import { UserRoles } from '../../types/user.types';

import NotificationController from './notification.controller';

const router = Router();

router.get('/', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), NotificationController.getAll);

export default router;