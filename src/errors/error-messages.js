/* eslint-disable no-unused-vars */
import {
  BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError,
} from './base-errors.js';

const ExampleNotFound = {
  parentError: NotFoundError,
  message: 'Example not found.',
  code: 1000,
};

export default {
  ExampleNotFound,
};
