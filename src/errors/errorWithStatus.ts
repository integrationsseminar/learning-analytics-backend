export class ErrorWithStatus extends Error {
    status: number | undefined
    constructor(msg: string, status?: number) {
        super(msg)
        this.status = status;
    }
}

export class HTTPBadRequestError extends ErrorWithStatus {
    status: 400
    constructor(msg: string) {
        super(msg)
        this.status = 400;
    }
}
export class HTTPUnauthorizedError extends ErrorWithStatus {
    status: 401
    constructor(msg: string) {
        super(msg)
        this.status = 401;
    }
}

export class HTTPNotFoundError extends ErrorWithStatus {
    status: 404
    constructor(msg: string) {
        super(msg)
        this.status = 404;
    }
}

export class HTTPInternalServerError extends ErrorWithStatus {
    status: 500
    constructor(msg: string) {
        super(msg)
        this.status = 500;
    }
}
