/* eslint-disable default-param-last */
class GeneralError extends Error {
  constructor(message, errorCode, statusCode = 500, data, args = []) {
    super(message);

    this.errorCode = errorCode;
    this.data = data;
    this.args = args;
    this.statusCode = statusCode;
  }
}

class BadRequestError extends GeneralError {
  constructor(message, code, statusCode = 400, data, args) {
    super(message, code, statusCode, data, args);
  }
}

class UnauthorizedError extends GeneralError {
  constructor(message, code, statusCode = 401, data, args) {
    super(message, code, statusCode, data, args);
  }
}

class ForbiddenError extends GeneralError {
  constructor(message, code, statusCode = 403, data, args) {
    super(message, code, statusCode, data, args);
  }
}

class NotFoundError extends GeneralError {
  constructor(message, code, statusCode = 404, data, args) {
    super(message, code, statusCode, data, args);
  }
}

export {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
