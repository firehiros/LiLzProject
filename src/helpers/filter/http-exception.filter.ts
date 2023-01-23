import { get } from 'lodash';
import { Request, Response } from 'express';
import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { CommonLogger } from '@helpers/logger/common-logger';
import { ERROR_CODE } from '@helpers/errors';
import { MESSAGES } from '@helpers/messages';
import { ILog } from '@/helpers/interfaces';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new CommonLogger('HttpExceptionFilter');

  private getStatus = (exception: HttpException) => {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  };

  private getCode = (exception: HttpException) => {
    return exception instanceof HttpException && exception.getResponse()['code']
      ? exception.getResponse()['code']
      : ERROR_CODE.ERR_UNKNOW;
  };

  private getMessage = (code: string, exception: HttpException): string => {
    const status = this.getStatus(exception);

    if (status === HttpStatus.UNPROCESSABLE_ENTITY) {
      const errors = this.getErrors(exception);
      return Object.values(get(errors, '[0].constraints')).shift() as string;
    }

    return exception?.message || MESSAGES.MGS_UNKNOW_ERROR(code);
  };

  private getErrors = (exception: HttpException) => {
    return exception instanceof HttpException
      ? exception.getResponse()['errors']
      : Object.assign(
          { data: (exception as any)?.response?.data },
          (exception as any)?.toJSON?.(),
        );
  };

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = this.getStatus(exception);
    const code = this.getCode(exception);
    const message = this.getMessage(code, exception);
    const errors = this.getErrors(exception);

    if (status == HttpStatus.INTERNAL_SERVER_ERROR) {
      const thisLog: ILog = {
        endpoint: request.path,
        ipAddress:
          request.headers['x-forwarded-for'] ||
          request.connection.remoteAddress,
        method: request.method,
        error: exception as any,
      };
      this.logger.customError(message, exception.stack, thisLog);
    }

    if (exception instanceof HttpException) {
      this.logger.log(JSON.stringify(exception.getResponse()));
    }

    response.status(status).json({
      message,
      code,
      errors,
      statusCode: status,
    });
  }
}
