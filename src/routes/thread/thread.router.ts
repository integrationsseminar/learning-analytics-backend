import { Router } from 'express';
import authMiddleware from '../../middleware/auth.middleware';
import { UserRoles } from '../../types/user.types';

import ThreadController from './thread.controller';

const router = Router();

router.get('/', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), ThreadController.getAll);
router.get('/:id', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), ThreadController.getById);
router.post('/', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), ThreadController.create);
router.put('/:id', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), ThreadController.update);
router.delete('/:id', authMiddleware([UserRoles.Lecturer, UserRoles.Admin]), ThreadController.delete);

export default router;