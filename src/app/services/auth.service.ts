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

  login(data: LoginData) {
    return new Observable<string>((observer) => {
      this.httpService.post<LoginResponse>('users/login', data)
        .subscribe((detail: LoginResponse) => {
          if (detail?.accessToken === '') {
            observer.next('ERROR_NAME_OR_PASS');
          } else {
            var currentUser = {
              accessToken: detail.accessToken,
              username: data.username
            }
            this._userDetails = new BehaviorSubject<LoginResponse>(currentUser);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this._userDetails.next(detail);
            observer.next('SUCCESS');
          }
        },
          (message) => {
            observer.error(message);
          });
      return { unsubscribe() { } };
    });
  }

  logout() {
    return new Observable<boolean>((observer) => {
      this.httpService.get<LogoutResponse>('users/logout')
        .subscribe((detail: LogoutResponse) => {
          if (!(detail?.loggedOut)) {
            localStorage.removeItem('currentUser');
            this._userDetails.next(null as any);
            observer.next(true);
          } else {
            observer.next(false);
          }
        });
      return { unsubscribe() { } };
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