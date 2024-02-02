export default class AppError extends Error {
  statusCode;

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  serializeErrors() {
    return [{ message: this.message }];
  }

  get status() {
    return `${this.statusCode}`.startsWith('4') ? '_Fail' : '_Error';
  }
}
