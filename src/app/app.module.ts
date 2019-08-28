import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './core/services/AuthGuard';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule, CoreModule, AppRoutingModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
