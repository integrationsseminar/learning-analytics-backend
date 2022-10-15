import { Router } from 'express';

import { UserRoles } from '../../types/user.types';
import authMiddleware from "../../middleware/auth.middleware";

import CourseController from './course.controller';

const router = Router();

router.get('/', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), CourseController.getAll);

router.get('/:id', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), CourseController.getById);

router.post('/', authMiddleware([UserRoles.Lecturer, UserRoles.Admin]), CourseController.create);

router.put('/:id', authMiddleware([ UserRoles.Lecturer, UserRoles.Admin]), CourseController.update);

router.delete('/:id', authMiddleware([UserRoles.Lecturer, UserRoles.Admin]), CourseController.delete);

export default router;