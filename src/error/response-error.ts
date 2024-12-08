export default class ResponseError extends Error {
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
