import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(protected router: Router,
    protected http: HttpClient,
    @Inject('BASE_URL') protected baseUrl: string) { 
      this.baseUrl = "https://localhost:11000/api/v1/"
    }

  public get<T>(url: string, options?: object): Promise<T> {
    return this.http.get<T>(this.baseUrl + url, options).toPromise();
  }
  public post<T>(url: string, body: object, options?: object): Promise<T> {
    return this.http.post<T>(this.baseUrl + url, body, options).toPromise();
  }
  public put<T>(url: string, body: object, options?: object): Promise<T> {
    return this.http.put<T>(this.baseUrl + url, body, options).toPromise();
  }
  public delete<T>(url: string, id: string, options?: object): Promise<T> {
    const route = `${url}/${id}`;
    return this.http.delete<T>(this.baseUrl + route, options).toPromise();
  }
}
