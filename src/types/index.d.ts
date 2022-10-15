import { TUserDocument } from './user.types'

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_URL: string;
            PORT: string;
        }
    }

    namespace Express {
        interface Request {
            user: TUserDocument;
        }
    }
}
