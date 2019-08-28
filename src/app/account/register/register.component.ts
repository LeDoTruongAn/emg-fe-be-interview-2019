import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  pageTitle = 'Register Account';
  registerForm: FormGroup;

  errorMessage: string;
  successMessage: string;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      txtUsername: '',
      txtPassword: '',
      txtConfirmPassword: ''
    });
  }

  register() {
    const arrAccount = localStorage.getItem('arrAccount') ? JSON.parse(localStorage.getItem('arrAccount')) : [];
    const { txtUsername, txtPassword, txtConfirmPassword } = this.registerForm.value;

    const existedAccount = arrAccount.some((account) => account.txtUsername === txtUsername);
    if (existedAccount) {
      this.successMessage = null;
      this.errorMessage = 'Username existed already!';
    } else {
      if (txtPassword !== txtConfirmPassword) {
        this.errorMessage = 'Confirm Password and Password does not match!';
        this.successMessage = null;
      } else {
        arrAccount.push({ txtUsername, txtPassword });
        localStorage.setItem('arrAccount', JSON.stringify(arrAccount));
        this.errorMessage = null;
        this.successMessage = `Create account successfully!`;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    }
  }

  reset() {
    this.registerForm.controls.txtUsername.setValue('');
    this.registerForm.controls.txtPassword.setValue('');
    this.registerForm.controls.txtConfirmPassword.setValue('');

    this.successMessage = null;
    this.errorMessage = null;
  }
}
