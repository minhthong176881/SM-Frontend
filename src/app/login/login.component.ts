import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({})
  public isRegister: boolean = false;
  public isLogin: boolean = true;
  protected message: string = '';
  protected loading: boolean = false;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private helperService: HelperService,
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
      validator: this.helperService.confirmValidator('password', 'confirmPassword')
    });
  }

  get f() {
    return this.form.controls;
  }

  change() {
    this.isRegister = !this.isRegister;
    this.isLogin = !this.isLogin;
  }

  register(username: string, password: string, email: string) {
    var user = {
      user: {
        id: "",
        username: username,
        password: password,
        email: email,
        role: "",
      }
    }
    this.authService.register(user).subscribe(result => {
      if (result === 'SUCCESS') {
        alert('Registered successfully!');
        const returnUrl: string = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/login';
        this.router.navigate([returnUrl]);
        window.location.href = returnUrl;
      } else {
        this.message = 'Fail to register new user!';
        alert('Error');
      }
    }, (message) => {
      this.message = message;
      this.loading = false;
    }
    );
  }

  login(username: string, password: string) {
    this.message = '';
    this.loading = true;
    var user = {
      username: username,
      password: password,
    }
    this.authService.login(user).subscribe(result => {
      if (result === 'SUCCESS') {
        const returnUrl: string = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
        window.location.href = returnUrl;
      } else if (result === 'ERROR_NAME_OR_PASS') {
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
}

