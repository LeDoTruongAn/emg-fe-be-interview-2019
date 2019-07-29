import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieCustomService } from '../cookie.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private storage: CookieCustomService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestOption: any = {};

        if (this.storage.getCookie().length !== 0) {
            requestOption.setHeaders = {
                Authorization: `Bearer ${this.storage.getCookie()}`
            };
        }

        request = request.clone(requestOption);
        return next.handle(request);
    }
}

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        public storage: CookieCustomService,
        private router: Router
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    // do stuff with response if you want
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        // redirect to the login route
                        // or show a modal
                        this.router.navigate(['/login']);
                    }
                }
            }));
    }
}
