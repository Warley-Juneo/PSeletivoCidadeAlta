import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    if (exception instanceof BadRequestException) {
      const obj: any = exception.getResponse();
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        path: request.url,
        msg: obj.message,
      });
    } else if (exception instanceof UnauthorizedException) {
      const obj: any = exception.getResponse();
      response.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        path: request.url,
        msg: obj.message,
      });
    } else if (exception instanceof RequestTimeoutException) {
      const obj: any = exception.getResponse();
      response.status(HttpStatus.REQUEST_TIMEOUT).json({
        statusCode: HttpStatus.REQUEST_TIMEOUT,
        path: request.url,
        msg: obj.message,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        path: request.url,
        msg: 'Internal server error',
      });
    }
  }
}
