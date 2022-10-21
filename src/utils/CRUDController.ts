import { Request, Response, NextFunction } from 'express';
import { Model, Document, PipelineStage, FilterQuery, HydratedDocument } from 'mongoose';

import { getQueryFromUrl } from 'odatafy-mongodb';
import { ErrorWithStatus } from '../errors/errorWithStatus';

export type CRUDControllerOptions<T, TDocumentType> = {
    softDelete?: boolean,
    routeConfigs?: {
        getAllBaseQuery?:  (req: Request) => Promise<PipelineStage[]>,
        getAllPostProc?: (req: Request, data: any[]) => Promise<any[]>,
        getByIdBaseQuery?: (req: Request) => Promise<FilterQuery<TDocumentType>>,
        getByIdPostProc?: (req: Request, data: HydratedDocument<TDocumentType>) => Promise<HydratedDocument<TDocumentType>>,
        updateBaseQuery?:  (req: Request) => Promise<FilterQuery<TDocumentType>>,
        updateBaseBody?:   (req: Request) => Promise<Partial<T> | Partial<DocumentType>>
        updatePostProc?: (req: Request, data: HydratedDocument<TDocumentType>) => Promise<HydratedDocument<TDocumentType>>,
        deleteBaseQuery?:  (req: Request) => Promise<FilterQuery<TDocumentType>>,
        deletePostProc?: (req: Request) => void
        createBaseBody?:  (req: Request) => Promise<Partial<T> | Partial<DocumentType>>
        createPostProc?: (req: Request, data: HydratedDocument<TDocumentType>) => Promise<HydratedDocument<TDocumentType>>,
    }
}

export default function<T, TDocumentType extends Document<T>, TModelType extends Model<TDocumentType>>(model: TModelType, opts?: CRUDControllerOptions<T, TDocumentType>) {
    return class {
        public static async getAll(req: Request, res: Response, next: NextFunction) {
            let query: PipelineStage[] | null = null;
            
            try {
                query = getQueryFromUrl(req.url) as PipelineStage[];
                
                if(opts?.softDelete) {
                    query = [ ...[{ $match: { deleted: { $ne: true } } }], ...query ]
                }

                //get base query
                if(opts?.routeConfigs?.getAllBaseQuery) {
                    query = [ ...await opts.routeConfigs.getAllBaseQuery(req), ...query ];
                }
            } catch(e) {
                next(e);
            }

            if(!query) {
                next(new Error('there was an Error Parsing the url'))
            }

            try {
                let data = await model.aggregate(query as PipelineStage[]);
                
                if(opts?.routeConfigs?.getAllPostProc) {
                    data = await opts.routeConfigs.getAllPostProc(req, data)
                }

                res.json({
                    'data': data,
                    'count': data.length
                });
            } catch(e) {
                next(e);
            }
        }

        public static async getById(req: Request, res: Response, next: NextFunction) {
            let query: FilterQuery<TDocumentType> = {
                _id: req.params.id
            }
            
            try {
                if(opts?.softDelete) {
                    //@ts-expect-error have to trust the user that he will not enable Softdelete if model does not use softdelete
                    query['deleted'] = { $ne: true }
                }

                //get base query
                if(opts?.routeConfigs?.getByIdBaseQuery) {
                    query = { ...query, ...await opts.routeConfigs.getByIdBaseQuery(req) }
                }

                let data = await model.findOne(query);

                if(!data) {
                    return next(new ErrorWithStatus("Document not found", 404))
                }

                if(opts?.routeConfigs?.getByIdPostProc) {
                    data = await opts.routeConfigs.getByIdPostProc(req, data)
                }

                res.json(data);
            } catch(e) {
                next(e);
            }
        }

        public static async create(req: Request, res: Response, next: NextFunction) {
            let body = req.body;

            try {
                let sanitizedBody = {
                    ...body
                }

                if(opts?.routeConfigs?.createBaseBody) {
                    sanitizedBody = { ...sanitizedBody, ...await opts.routeConfigs.createBaseBody(req) }
                }

                let data = await model.create(sanitizedBody);

                if(!data) {
                    return next(new ErrorWithStatus("Document not found", 404))
                }

                if(opts?.routeConfigs?.createPostProc) {
                    data = await opts.routeConfigs.createPostProc(req, data)
                }

                res.json(data);
            } catch(e) {
                next(e);
            }
        }

        public static async update(req: Request, res: Response, next: NextFunction) {
            let body = req.body;
            
            let query = {
                _id: req.params.id
            }
            
            try {
                if(opts?.softDelete) {
                    //@ts-expect-error have to trust the user that he will not enable Softdelete if model does not use softdelete
                    query['deleted'] = { $ne: true }
                }

                let sanitizedBody = {
                    ...body
                }

                if(opts?.routeConfigs?.updateBaseQuery) {
                    sanitizedBody = { ...sanitizedBody, ...await opts.routeConfigs.updateBaseQuery(req) }
                }

                if(opts?.routeConfigs?.updateBaseQuery) {
                    query = { ...query, ...await opts.routeConfigs.updateBaseQuery(req) }
                }

                if(opts?.softDelete) {
                    query = { ...{ deleted: { $ne: true }}, ...query }
                }

                let data = await model.findOneAndUpdate(query, sanitizedBody, { new: true });

                if(!data) {
                    return next(new ErrorWithStatus("Document not found", 404))
                }

                if(opts?.routeConfigs?.updatePostProc) {
                    data = await opts.routeConfigs.updatePostProc(req, data)
                }

                res.json(data);
            } catch(e) {
                next(e);
            }
        }

        public static async delete(req: Request, res: Response, next: NextFunction) {
            let query = {
                _id: req.params.id
            }
            
            try {
                if(opts?.softDelete) {
                    //@ts-expect-error have to trust the user that he will not enable Softdelete if model does not use softdelete
                    query['deleted'] = { $ne: true }
                }

                if(opts?.routeConfigs?.deleteBaseQuery) {
                    query = { ...query, ...await opts.routeConfigs.deleteBaseQuery(req) }
                }

                let data = model.findOne(query);
                if(!data) {
                    return next(new ErrorWithStatus("Document not found", 404))
                }

                if(opts?.softDelete) {
                    await model.findOneAndUpdate(query, { deleted: true });
                } else {
                    await model.deleteOne(query);
                }

                if(opts?.routeConfigs?.deletePostProc) {
                    await opts.routeConfigs.deletePostProc(req)
                }

                res.status(204).json({});
            } catch(e) {
                next(e);
            }
        }
    }
}