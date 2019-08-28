import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainMenuComponent, PageNotFoundComponent],
  imports: [CommonModule, RouterModule],
  exports: [MainMenuComponent, PageNotFoundComponent]
})
export class CoreModule {}
