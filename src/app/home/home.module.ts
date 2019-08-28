import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MeComponent } from './me/me.component';
import { HomeComponent } from './home.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [MeComponent, HomeComponent],
  imports: [CommonModule, HomeRoutingModule, CoreModule]
})
export class HomeModule {}
