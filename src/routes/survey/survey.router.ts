import { Router } from 'express';

import { UserRoles } from '../../types/user.types';
import authMiddleware from "../../middleware/auth.middleware";

import SurveyController from './survey.controller';

const router = Router();

router.get('/', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), SurveyController.getAll);

router.post('/:id/answers', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), SurveyController.submitSurveyAnswer);

router.get('/:id', authMiddleware([UserRoles.Student, UserRoles.Lecturer, UserRoles.Admin]), SurveyController.getById);

router.post('/', authMiddleware([UserRoles.Lecturer, UserRoles.Admin]), SurveyController.create);

router.put('/:id', authMiddleware([ UserRoles.Lecturer, UserRoles.Admin]), SurveyController.update);

router.delete('/:id', authMiddleware([UserRoles.Lecturer, UserRoles.Admin]), SurveyController.delete);

export default router;