export class ErrorWithStatus extends Error {
    status: number | undefined
    constructor(msg: string, status?: number) {
        super(msg)
        this.status = status;
    }
}