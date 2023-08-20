import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { MyLoggingService } from "@app/logging/logging.service";
import { Request, Response } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: MyLoggingService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const method = request.method;
    const url = request.url;
    const queryParams = JSON.stringify(request.query);
    const body = JSON.stringify(request.body);

    this.loggingService.log(`REQUEST:: Method: ${method}, URL: ${url}, QueryParams: ${queryParams}, Body: ${body}`);
    return next.handle().pipe(
      tap(() => {
        const { statusCode } = response;
        this.loggingService.log(`RESPONSE:: statusCode: ${statusCode}`);
      })
    );
  }
}