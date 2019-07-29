import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { LoginServiceService } from './services/login-service.service';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  imports: [
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [LoginPageComponent],
  exports: [],
  providers: [LoginServiceService, CookieService ,
   ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule { }
