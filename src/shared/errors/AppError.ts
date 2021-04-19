export class AppError implements Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    // super();
    this.message = message;
    this.statusCode = statusCode;
  }
  name: string;
  stack?: string | undefined;
}
