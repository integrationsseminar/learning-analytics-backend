
import { TCourse, TCourseDocument, TCourseModel } from '../../types/course.types';
import Course from '../../models/course.model';

import BaseCRUDController, { CRUDControllerOptions } from '../../utils/CRUDController';

const CRUDOpts: CRUDControllerOptions<TCourse, TCourseDocument> = {
    softDelete: true
} 

export default class CourseController extends BaseCRUDController<TCourse, TCourseDocument, TCourseModel>(Course, CRUDOpts){}