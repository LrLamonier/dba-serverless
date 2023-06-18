class AppError extends Error {
  statusCode: string;
  status: string;
  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode + "";
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  }
}

export default AppError;
