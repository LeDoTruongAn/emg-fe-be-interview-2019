import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class CookieCustomService {
  NAMECOOKIE = 'emg-cookie';
  sessionId: string;
  constructor(
    private cookieService: CookieService
  ) {
    this.sessionId = this.cookieService.get('sessionId');
    console.log(': sessionId', this.sessionId);
  }

  getCookie(): string {
    return this.cookieService.get(this.NAMECOOKIE);
  }

  setCookie(token: string): void {
    this.cookieService.set(this.NAMECOOKIE, token);
  }

  removeCookie(): void {
    this.cookieService.delete(this.NAMECOOKIE);
  }
}
