import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  protected form: FormGroup = new FormGroup({})
  protected isRegister: boolean = false;
  protected isLogin: boolean = true;
  protected message: string = '';
  protected loading: boolean = false;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.confirmValidator('password', 'confirmPassword')
    });
  }

  get f() {
    return this.form.controls;
  }

  change() {
    this.isRegister = !this.isRegister;
    this.isLogin = !this.isLogin;
  }

  submit() {
    console.log(this.form.value);
  }

  login(user: User) {
    this.message = '';
    this.loading = true;
    this.authService.login(user).subscribe(result => {
      if (result === 'success') {
        const returnUrl: string = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      } else if (result === 'error') {
        this.message = 'Invalid username or password';
        this.loading = false;
        alert('Error');
      }
    }, (message) => {
      this.message = message;
      this.loading = false;
    }
    );
  }

  confirmValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}

export interface User {
  username: string;
  password: string;
}
