import { Router } from "express";
import AuthRouter from "./auth/auth.router";
import PingRouter from "./ping/ping.router";
import UserRouter from "./user/user.router";
import CourseRouter from './course/course.router';
import ThreadRouter from './thread/thread.router';
import SurveyRouter from './survey/survey.router';
import ThreadCommentRouter from './threadcomment/threadcomment.router'
import ThreadNotificationsRouter from './notification/notification.router'

const router = Router();

router.use("/auth", AuthRouter);
router.use("/ping", PingRouter);
router.use("/users", UserRouter);
router.use('/courses', CourseRouter);
router.use('/threads', ThreadRouter);
router.use('/surveys', SurveyRouter);
router.use('/threadcomments', ThreadCommentRouter);
router.use('/notifications', ThreadNotificationsRouter)

export default router