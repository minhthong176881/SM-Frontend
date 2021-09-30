import { ObserversModule } from '@angular/cdk/observers';
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

  register(data: RegisterRequest) {
    return new Observable<string>((observer) => {
      this.httpService.post<User>('users/register', data)
        .subscribe((response: User) => {
          if (response !== null) {
            observer.next('SUCCESS');
          } else {
            observer.next('FAIL');
          }
        },
          (message) => {
            observer.error(message);
          });
      return { unsubscribe() { } };
    });
  }

  login(data: LoginRequest) {
    return new Observable<string>((observer) => {
      this.httpService.post<LoginResponse>('users/login', data)
        .subscribe((detail: LoginResponse) => {
          if (detail?.accessToken === '') {
            observer.next('ERROR_NAME_OR_PASS');
          } else {
            var currentUser = {
              accessToken: detail.accessToken,
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
          console.log(detail);
          if (detail?.loggedOut) {
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

  authenticate(data: LoginRequest) {
    return new Observable<string>((observer) => {
      this.httpService.post<AuthenticateResponse>('users/authenticate', data)
        .subscribe((detail: AuthenticateResponse) => {
          if (!detail?.authenticated) {
            observer.next('FAIL');
          } else {
            observer.next('SUCCESS');
          }
        },
          (message) => {
            observer.error(message);
          });
      return { unsubscribe() { } };
    });
  }
}

export interface User {
  id: string, 
  username: string,
  password: string,
  email: string,
  role: string,
}

export interface UserDetail {
  username: string;
  role: string;
}


export interface RegisterRequest {
  user: User
}

export interface LoginRequest {
  username: string,
  password: string,
}

export interface LoginResponse {
  accessToken: string,
}

export interface AuthenticateResponse {
  authenticated: boolean,
}

export interface LogoutResponse {
  loggedOut: boolean;
}