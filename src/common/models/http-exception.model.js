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

export class CustomNotFoundException extends HttpException{
    constructor(name, id) {
        super(404, `${name} with id ${id} was not found.`);
    }
}

export class BadRequestException extends HttpException{
    constructor(message) {
        super(400, message);
    }
}

export class ServiceUnavailableException extends HttpException{
    constructor(message) {
        super(503, message);
    }
}
