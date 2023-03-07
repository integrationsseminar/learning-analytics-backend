import { Router } from 'express';
import authMiddleware from '../../middleware/auth.middleware';
import { UserRoles } from '../../types/user.types';
import LearningProgressEntryController from './learningProgressEntry.controller';


const router = Router();

router.get('/', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), LearningProgressEntryController.getAll);
router.post('/', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), LearningProgressEntryController.create);

export default router;