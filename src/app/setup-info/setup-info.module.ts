import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SetupInfoComponent} from './setup-info.component'
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: SetupInfoComponent
  }
];
@NgModule({
  declarations: [SetupInfoComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SetupInfoModule { }
