import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {ChangePasswordComponent} from './change-password.component'

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent
  }
];
@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ChangePasswordModule { }
