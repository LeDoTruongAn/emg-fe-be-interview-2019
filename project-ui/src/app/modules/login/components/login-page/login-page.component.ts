import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { UserModel } from 'src/app/modules/users/models/user.model';
import { LoginServiceService } from '../../services/login-service.service';
import { CookieCustomService } from 'src/app/core/services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  public account: UserModel;
  public errorString = '';
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private loginService: LoginServiceService,
    private cookieService: CookieCustomService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initialForm();
  }

  onFormChange(): void {
    this.loginForm.valueChanges.subscribe(val => {
      if (this.errorString !== '') {
        this.errorString = '';
      }
    });
  }


  private initialForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.onFormChange();
  }

  public onLogin() {
    this.loginService.logIn(this.loginForm.value).subscribe(res => {
      if (res.token) {
        const token = res.token as string;
        this.cookieService.setCookie(token);
        this.router.navigate(['/home']);
      }
    },
      err => {
        this.errorString = err.error.message;
      });
  }

  public openDialogRegister(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '300px',
      data: { pageName: 'Registration' }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
