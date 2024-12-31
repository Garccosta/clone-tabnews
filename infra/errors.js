export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno nao esperado ocorreu.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
    this.statusCode = 500;
  }

  toJSON() {
    return {
      message: this.message,
      cause: this.cause,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
