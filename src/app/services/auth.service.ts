import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string;
  constructor(private httpService: HttpService) {
    this.accessToken = localStorage.getItem('accessToken') || '';
  }

  login(data: LoginData): Observable<string> {
    return new Observable<string>(observer => {
      this.httpService.post<LoginResponse>('/login', data).then(res => {
        if (res.accessToken !== '') {
          this.accessToken = res.accessToken;
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
    this.accessToken = '';
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