import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _accessToken: string;
  get accessToken(): LoginResponse {
    return { accessToken: this._accessToken };
  }
  constructor(private httpService: HttpService) {
    this._accessToken = localStorage.getItem('accessToken') || '';
  }

  login(data: LoginData): Observable<string> {
    return new Observable<string>(observer => {
      this.httpService.post<LoginResponse>('users/login', data).then(res => {
        if (res.accessToken !== '') {
          this._accessToken = res.accessToken;
          localStorage.setItem('accessToken', res.accessToken);
          observer.next('success');
        } else {
          observer.next('error');
        }
      });
    });
  }

  logout() {
    localStorage.removeItem('accessToken');
    this._accessToken = '';
  }
}

export enum UserRoles {
  UNAUTHENTICATED = 0,
  ADMIN = 1,
  USER = 2,
}

export interface LoginData {
  username: string,
  password: string,
}

export interface LoginResponse {
  accessToken: string,
}