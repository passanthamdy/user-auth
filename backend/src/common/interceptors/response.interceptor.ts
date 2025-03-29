
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, { Status: number; Data: T }> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<{ Status: number; Data: T }> {
    return next.handle().pipe(
      map(data => ({
        Status: 200,
        Data: data
      }))
    );
  }
}
