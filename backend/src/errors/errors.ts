export class CustomError extends Error {
  public code: number;
  public status: number;
  public message: string;
  public context: string[];

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
    this.context = [];
  }
  /**
   * This function allows you to add context to error messages
   * such as stack traces
   * @param message Message to be added
   */
  public addContext(message: string) {
    this.context.push(message);
    return this.context;
  }

  /**
   * This method will display the error message
   * based on whether its client facing or not
   * @param clientFacing: determines whether the message is client facing
   */
  public displayMessage(clientFacing: boolean) {
    if (clientFacing) {
      return this.message;
    }

    return `Error: Type ${this.constructor.name}, Code ${this.code.toString()}, Context: ${
      this.context.length ? `\n${this.context.join("\n\n")}` : ""
    }`;
  }
}
