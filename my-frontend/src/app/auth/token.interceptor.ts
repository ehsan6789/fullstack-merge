import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    // Define public endpoints that should NOT have Authorization header
    const publicUrls = [
      '/api/Auth/login',
      '/api/Auth/register',
      '/api/Auth/forgot-password',
      '/api/Auth/reset-password'
    ];

    const isPublic = publicUrls.some(url => req.url.includes(url));

    if (token && !isPublic) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req);
  }
}
