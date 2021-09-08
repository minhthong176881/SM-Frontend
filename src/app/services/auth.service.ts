import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userDetails: BehaviorSubject<LoginResponse>;
  private _currentUser: Observable<LoginResponse>;
  get userDetail(): LoginResponse {
    return this._userDetails.value;
  }
  get currentUser(): Observable<LoginResponse> {
    return this._currentUser;
  }
  constructor(private httpService: HttpService) {
    this._userDetails = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this._currentUser = this._userDetails.asObservable();
  }

  login(data: LoginData): Observable<string> {
    return new Observable<string>(observer => {
      this.httpService.post<LoginResponse>('users/login', data).then(res => {
        if (res.accessToken !== '') {
          var details = { username: data.username, accessToken: res.accessToken };
          this._userDetails = new BehaviorSubject<LoginResponse>(details);
          localStorage.setItem('currentUser', JSON.stringify(details));
          observer.next('success');
        } else {
          observer.next('error');
        }
      });
    });
  }

  logout(): Observable<boolean> {
    return new Observable<boolean>(resolve => {
      this.httpService.get<LogoutResponse>('users/logout').then(res => {
        if (res.loggedOut) {
          localStorage.removeItem('currentUser');
          this._userDetails.next(null as any);
          resolve.next(true);
        } else {
          resolve.next(false);
        }
      })
    });
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
  username: string,
  accessToken: string,
}

export interface LogoutResponse {
  loggedOut: boolean;
}