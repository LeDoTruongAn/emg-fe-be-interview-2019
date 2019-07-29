// Angular Deps
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { TokenInterceptor, JwtInterceptor } from 'src/app/core/services/interceptor/tokenhandle.interceptor';
import { DialogComfirmComponent } from './dialog-comfirm/dialog-comfirm.component';
import { RegisterDialogComponent } from '../login/components/register-dialog/register-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    declarations: [
    DialogComfirmComponent, RegisterDialogComponent],
    entryComponents: [
        DialogComfirmComponent,
        RegisterDialogComponent
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: [
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule { }
