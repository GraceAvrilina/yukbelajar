import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPage
      },
      {
        path: 'register',
        loadChildren: '../register/register.module#RegisterModule'
      }
    ]),
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
