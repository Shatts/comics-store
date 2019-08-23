export class HttpException {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}

export class NotFoundException extends HttpException{
    constructor(message) {
        super(404, message);
    }
}

export class BadRequestException extends HttpException{
    constructor(message) {
        super(400, message);
    }
}
