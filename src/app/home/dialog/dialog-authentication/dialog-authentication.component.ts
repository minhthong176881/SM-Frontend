import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-authentication',
  templateUrl: './dialog-authentication.component.html',
  styleUrls: ['./dialog-authentication.component.css']
})
export class DialogAuthenticationComponent implements OnInit {
  currentUser: string;
  hide = true;
  message: string;
  authenticated = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private authService: AuthService) { 
    this.currentUser = data;
  }

  ngOnInit(): void {
  }

  authenticate(password: string) {
    var user = {
      username: this.currentUser,
      password: password,
    }
    this.authService.authenticate(user).subscribe(result => {
      if (result === 'SUCCESS') {
        this.authenticated = true;
        this.message = "";
      } else if (result === 'FAIL') {
        this.authenticated = false;
        this.message = 'Password for ' + this.currentUser + ' is incorrect!';
      }
    }, (message) => {
      this.message = message;
    }
    );
  }

}
