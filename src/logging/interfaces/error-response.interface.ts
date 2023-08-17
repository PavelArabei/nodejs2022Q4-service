export interface HttpExceptionRes {
  statusCode: number,
  error: string
}

export interface ErrorResponse extends HttpExceptionRes {
  path: string,
  method: string,
  timeStamp: Date
}