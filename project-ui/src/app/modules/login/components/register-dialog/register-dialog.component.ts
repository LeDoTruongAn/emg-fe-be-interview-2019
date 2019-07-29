import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginServiceService } from '../../services/login-service.service';
import { IUserRegisterModel } from '../../models/login.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.errors);

    return (invalidCtrl || invalidParent);
  }
}
@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  addOn = new EventEmitter();
  public errorRegistor = '';
  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {
    this.initialForm();
  }

  onNoClick(): void {
    this.errorRegistor = '';
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data['pageName'] === 'Edit User') {
      this.registerForm.controls.password.setValidators([]);
      this.registerForm.controls.passwordConfirm.setValidators([]);
      this.getUserById();
    }
  }

  private initialForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    }, { validator: this.checkPasswords });
    this.onFormChange();
  }

  private onFormChange(): void {
    this.registerForm.valueChanges.subscribe(val => {
      if (this.errorRegistor !== '') {
        this.errorRegistor = '';
      }
    });
  }

  private checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.passwordConfirm.value;
    if (pass === confirmPass || pass.length === 0) {
      return null;
    } else {
      return { notSamePass: true };
    }
  }

  public onSubmitForm() {
    const account = new IUserRegisterModel(this.registerForm.value);
    if (this.data['pageName'] === 'Edit User') {
      this.loginService.editAccount(this.data['infoUser'].id, account).subscribe(res => {
        this.onNoClick();
        this.addOn.emit('success');
      }, error => {
        this.errorRegistor = error.error.message;
      });
    } else {
      this.loginService.registerAccount(account).subscribe(res => {
        this.onNoClick();
        this.addOn.emit('success');
      }, error => {
        this.errorRegistor = error.error.message;
      });
    }
  }

  private getUserById() {
    const userInfo = new IUserRegisterModel(this.data['infoUser']);
    this.registerForm.controls.userName.setValue(userInfo.userName);
    this.registerForm.controls.firstName.setValue(userInfo.firstName);
    this.registerForm.controls.lastName.setValue(userInfo.lastName);
  }

}
