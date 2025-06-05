import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const baseInterceptor: HttpInterceptorFn = (req, next) => {

  // TODO: Add a req method if a request is OPTIONS, then return next(req)
  // TODO: Add validation if req.method includes 'login.php', then return next(req)
  // TODO: Add validation if req.url includes 'api/login' and req.method is GET, then return next(req)


  // TODO: get token from local storage or user-context.service
  const token = 'Bearer 1234567890';

  let headers = req.headers.set('Content-Type', 'application/json');

  if (token) {
    headers = headers.set('Authorization', token);
  }

  const newReq = req.clone({ headers });

  return next(newReq).pipe(
    tap(res => {
      console.log(res);
      return res;
    }),
    catchError(err => {
      if (err.status === 401 || err.status === 403) {
        console.log('Unauthorized');
      }
      console.log(err);
      return throwError(() => err);
    }));
};
