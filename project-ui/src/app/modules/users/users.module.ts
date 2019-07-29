import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UserContainerComponent } from './components/user-container/user-container.component';
import { SharedModule } from '../shared/shared.module';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [UserContainerComponent],
  imports: [
    UsersRoutingModule,
    SharedModule
  ],
  providers: [UsersService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsersModule { }
