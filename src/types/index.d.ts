import { TUserDocument } from './user.types'

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_URL: string;
            PORT: number;
        }
    }

    namespace Express {
        interface Request {
            user: TUserDocument;
        }
    }
}
