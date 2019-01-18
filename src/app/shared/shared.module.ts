import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  declarations: [
    HeaderComponent,
    NavbarComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    NopagefoundComponent
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    NopagefoundComponent
  ]
})
export class SharedModule {}
