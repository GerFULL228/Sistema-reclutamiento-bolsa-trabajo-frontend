import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, switchMap } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth/auth';
import { TokenService } from '../services/token/token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  const token = tokenService.getAccessToken();

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refreshToken = tokenService.getRefreshToken();
        if (!refreshToken) return throwError(() => error);

        return authService.refreshToken().pipe(
          switchMap(response => {
            tokenService.saveAccessToken(response.accessToken);
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${response.accessToken}` }
            });
            return next(retryReq);
          })
        );
      }
      return throwError(() => error);
    })
  );
};