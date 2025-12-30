export class CustomError extends Error {
  public code: number;
  public status: number;
  public message: string;

  /**
   * @param code      Error code
   * @param status    Response status when sending error response
   * @param message   Informative error message
   */
  constructor(code: number, status: number, message: string) {
    super(message);
    this.code = code;
    this.status = status;
    this.message = message;
  }
}
