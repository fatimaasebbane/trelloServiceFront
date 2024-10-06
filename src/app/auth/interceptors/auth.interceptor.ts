import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {TokenStorageService} from '../../core/services/token-storage.service';
import {AuthService} from '../services/auth.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private tokenService: TokenStorageService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    if (req.url.includes("auth")) {
      return next.handle(req);
    }

    const token = this.tokenService.getAccessToken();
    let authReq = req.clone({withCredentials: true});

    if (token) {
      authReq = this.addTokenHeader(authReq, token);
    }

    return next.handle(authReq).pipe(
      catchError(error => this.handleError(error, authReq, next))
    );
  }

  private handleError(error: any, request: HttpRequest<any>, next: HttpHandler) {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      return this.handle401Error(request, next);
    }
    return throwError(() => error);
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.tokenService.saveTokens(token.accessToken.token, token.refreshToken.token);
          return next.handle(this.addTokenHeader(request, token.accessToken.token));
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => err);
        })
      );
    }
    return next.handle(request);
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, "Bearer " + token)});
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
