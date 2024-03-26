/* eslint-disable no-return-assign */
import CUSTOM_ERRORS from './error-messages.js';

const generateCustomErrors = (extendClass, generatedClass, message, code, statusCode) => ({
  [generatedClass]: class extends extendClass {
    constructor(data, ...args) {
      super(message, code, statusCode, data, args);
    }
  },
}[generatedClass]);

export default Object.keys(CUSTOM_ERRORS).reduce((acc, customError) => ({
  ...acc,
  [customError]: generateCustomErrors(
    CUSTOM_ERRORS[customError].parentError,
    customError,
    CUSTOM_ERRORS[customError].message,
    CUSTOM_ERRORS[customError].code,
  ),
}), {});
