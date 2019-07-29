import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class Utilities {
    req: RequestHelper;
    reqV2: RequestHelperV2;

    constructor(private httpClient: HttpClient) {

        this.req = new RequestHelper(httpClient);
        this.reqV2 = new RequestHelperV2(httpClient);
    }
}

class RequestHelper {

    constructor(private httpClient: HttpClient) { }

    public get(api: string, options?: any): Observable<any> {
        return this.httpClient.get(api, options);
    }

    public post(api: string, data: any, options?: any): Observable<any> {
        if (!options) { options = {}; }
        return this.httpClient.post(api, data, options);
    }

    public put(api: string, data: any, options?: any): Observable<any> {
        if (!options) { options = {}; }
        return this.httpClient.put(api, data, options);
    }

    public delete(api: string): Observable<any> {
        return this.httpClient.delete(api);
    }
}


class RequestHelperV2 {
    constructor(private httpClient: HttpClient) { }

    public httpGet<T>(api: string): Observable<T> {
        return this.httpClient.get(api).pipe(
            map((result => result as T))
        );
    }

    public httpPost<T>(api: string, payload?: any): Observable<T> {
        return this.httpClient.post(api, payload).pipe(
            map(result => result as T)
        );
    }

    public httpPut<T>(api: string, payload?: any): Observable<T> {
        return this.httpClient.put(api, payload).pipe(
            map(result => result as T)
        );
    }

    public httpDelete<T>(api: string): Observable<T> {
        return this.httpClient.delete(api).pipe(
            map(result => result as T)
        );
    }
}
