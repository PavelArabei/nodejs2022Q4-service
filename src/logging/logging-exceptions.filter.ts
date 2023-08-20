import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { ErrorResponse, HttpExceptionRes } from "@app/logging/interfaces/error-response.interface";
import { MyLoggingService } from "@app/logging/logging.service";

@Catch()
export class LoggingExceptionsFilter implements ExceptionFilter {

  constructor(private readonly loggingService: MyLoggingService) {
  }

  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus, errorMessage: string, stackTrace: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage = (errorResponse as HttpExceptionRes).error || exception.message;
      stackTrace = exception.stack;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = "Internal Server Error'";
      stackTrace = (exception as Error).stack || "";
    }
    this.loggingService.error(errorMessage, stackTrace);

    const errorResponse: ErrorResponse = this.getErrorRes(status, errorMessage, request);
    response.status(status).json(errorResponse);
  }


  private getErrorRes = (status: HttpStatus, errorMessage: string, request: Request): ErrorResponse => {
    return {
      statusCode: status,
      error: errorMessage,
      path: request.url,
      method: request.method,
      timeStamp: new Date()
    };
  };


}