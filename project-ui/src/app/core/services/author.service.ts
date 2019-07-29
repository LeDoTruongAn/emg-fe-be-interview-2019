import { Injectable } from '@angular/core';
import { Utilities } from '../utils/utilities';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorService {
    urlApi = 'http://localhost:8000/users/';

    public baseUrl: string;

    constructor(
        private u: Utilities,
    ) { }

    getInfoUser(idUser): Observable<any> {
        const url = this.urlApi + `${idUser}`;
        return this.u.reqV2.httpGet<any>(url);
    }
}
