import { Component, OnInit } from '@angular/core';
import { CookieCustomService } from '../../services/cookie.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthorService } from '../../services/author.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sessionId: string;
  userName: string;
  constructor(
    private router: Router,
    private cookieService: CookieCustomService,
    private authorService: AuthorService
  ) {
  }

  ngOnInit() {
    const cookie = this.cookieService.getCookie();
    if (cookie.length === 0) {
      this.router.navigate(['/login']);
    } else {
      this.decodeJWT(cookie);
    }
  }

  decodeJWT(jwt: string): any {
    const helper = new JwtHelperService();
    const decodeToken = helper.decodeToken(jwt);
    const isTokenExpired = helper.isTokenExpired(jwt);
    if (isTokenExpired) {
      this.router.navigate(['/login']);
    } else {
      this.getInfoUser(decodeToken.sub);
    }
  }

  getInfoUser(idUser: string) {
    this.authorService.getInfoUser(idUser).subscribe(res => {
      console.log(res);
      this.userName = res.firstName;
    });
  }

  onLogout(): void {
    this.cookieService.removeCookie();
    this.router.navigate(['/login']);
  }

}
