import { Router } from 'express';
import authMiddleware from '../../middleware/auth.middleware';
import { UserRoles } from '../../types/user.types';

import UserTrophyController from './usertrophy.controller';

const router = Router();


router.get('/', authMiddleware([ UserRoles.Student ]), UserTrophyController.getUserTrophys);

router.get('/:name', authMiddleware([ UserRoles.Student ]), UserTrophyController.getUserTrophyByIdentifier);

export default router;