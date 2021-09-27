import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(
    private dialogRef: MatDialogRef<DialogAuthenticationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private authService: AuthService) { 
    this.currentUser = data.data;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(false);
  }

  authenticate(password: string) {
    var user = {
      username: this.currentUser,
      password: password,
    }
    this.authService.authenticate(user).subscribe(result => {
      if (result === 'SUCCESS') {
        this.dialogRef.close(true);
      } else if (result === 'FAIL') {
        this.message = 'Password for ' + this.currentUser + ' is incorrect!';
        let err = document.getElementById('error-message')
        err!.innerText = this.message;
      }
    });
  }

}
