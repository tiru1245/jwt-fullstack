import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { routes } from './app.routes';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

// 1. Unified Functional Interceptor for Handling Requests & 401 Silent Refresh Loops
const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('access_token');
  let authReq = req;

  // Add the Bearer token if available and not calling auth endpoints
  if (token && !req.url.includes('/api/auth/')) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      // If unauthorized error occurs and it's not on the auth endpoints, attempt a token refresh
      if (error.status === 401 && !req.url.includes('/api/auth/')) {
        return authService.refreshToken().pipe(
          switchMap((res) => {
            // Retry the original failed request with the newly generated access token
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${res.accessToken}` }
            });
            return next(retryReq);
          }),
          catchError((refreshErr) => {
            // If the refresh token itself is expired, wipe session and redirect to login page
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => error);
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])) // 👈 Registers the complete security lifecycle filter
  ]
};
