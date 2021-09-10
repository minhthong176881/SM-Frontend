import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(protected router: Router,
    protected http: HttpClient,
    @Inject('BASE_URL') protected baseUrl: string) { 
      this.baseUrl = "http://localhost:11000/api/v1/"
    }

  public get<T>(url: string, options?: object): Observable<T> {
    return this.http.get<T>(this.baseUrl + url, options);
  }
  public post<T>(url: string, body: object, options?: object): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, body, options);
  }
  public put<T>(url: string, body: object, options?: object): Observable<T> {
    return this.http.put<T>(this.baseUrl + url, body, options);
  }
  public delete<T>(url: string, id: string, options?: object): Observable<T> {
    const route = `${url}/${id}`;
    return this.http.delete<T>(this.baseUrl + route, options);
  }
}
