import { Router } from 'express';
import authMiddleware from '../../middleware/auth.middleware';
import { UserRoles } from '../../types/user.types';

import TrophyController from './trophy.controller';

const router = Router();

router.get('/', authMiddleware([ UserRoles.Student ]), TrophyController.getAvailableTrophys);

export default router;