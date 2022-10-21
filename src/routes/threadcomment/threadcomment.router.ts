import { Router } from 'express';
import authMiddleware from '../../middleware/auth.middleware';
import { UserRoles } from '../../types/user.types';

import ThreadCommentController from './threadcomment.controller';

const router = Router();

router.get('/', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), ThreadCommentController.getAll);
router.get('/:id', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), ThreadCommentController.getById);
router.post('/', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), ThreadCommentController.create);
router.delete('/:id', authMiddleware([UserRoles.Admin]), ThreadCommentController.delete);

export default router;