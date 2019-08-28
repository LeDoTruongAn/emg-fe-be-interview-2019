import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  pageTitle = 'Log In';
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['']);
    }

    this.loginForm = this.buildLoginForm();
  }

  buildLoginForm(): FormGroup {
    return this.formBuilder.group({
      txtUsername: '',
      txtPassword: ''
    });
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  reset() {
    this.loginForm.controls.txtUsername.setValue('');
    this.loginForm.controls.txtPassword.setValue('');

    this.errorMessage = null;
  }

  login() {
    const arrAccount = localStorage.getItem('arrAccount') ? JSON.parse(localStorage.getItem('arrAccount')) : [];
    const { txtUsername, txtPassword } = this.loginForm.value;

    const passedLogin = arrAccount.some((account) => account.txtUsername === txtUsername && account.txtPassword === txtPassword);
    if (passedLogin) {
      localStorage.setItem('currentUser', JSON.stringify({ username: txtUsername, passedLogin }));
      this.router.navigate(['']);
    } else {
      this.errorMessage = 'Username or Password is not correct!';
    }
  }
}
