import { Component, OnInit } from '@angular/core';
import { AuthService, UserDetail } from '../services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _currentUser: UserDetail;
  get currentUser() {
    return this._currentUser;
  }

  constructor(private authService: AuthService) { 
    this._currentUser = jwt_decode(this.authService.userDetail.accessToken);
  }

  ngOnInit(): void {

  }
}
