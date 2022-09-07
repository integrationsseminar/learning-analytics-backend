import { Router } from 'express';

import { Course } from '../db/models/course';

const router = Router();

router.post('/', async (req, res)=>{
    const course = Course.build(req.body);
    await course.save();
    res.json(course.toJSON());
});

export { router as CourseRouter }