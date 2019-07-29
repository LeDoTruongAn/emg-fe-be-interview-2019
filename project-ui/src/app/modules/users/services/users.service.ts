import { Injectable } from '@angular/core';
import { Utilities } from 'src/app/core/utils/utilities';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  urlApi = 'http://localhost:8000/users/';
  constructor(
    private utils: Utilities,
    private http: HttpClient
  ) { }

  getListUser(): Observable<any> {
    return this.utils.reqV2.httpGet<any>(this.urlApi);
  }

  deleteUser(id): Observable<any> {
    const url = this.urlApi + id;
    return this.utils.reqV2.httpDelete<any>(url);
  }
}
