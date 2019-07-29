import { Injectable } from '@angular/core';
import { Utilities } from 'src/app/core/utils/utilities';
import { Observable } from 'rxjs';
import { IUserLoginModel, IUserRegisterModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  urlApi = 'http://localhost:8000/users/';
  constructor(
    private utils: Utilities
  ) { }

  public logIn(user: IUserLoginModel): Observable<any> {
    const url = this.urlApi + 'authenticate';
    return this.utils.reqV2.httpPost<any>(url, user);
  }

  public registerAccount(user: IUserRegisterModel): Observable<any> {
    const url = this.urlApi + 'register';
    return this.utils.reqV2.httpPost<any>(url, user);
  }

  public editAccount(id, user: IUserRegisterModel): Observable<any> {
    const url = this.urlApi + id;
    return this.utils.reqV2.httpPut<any>(url, user);
  }

}
