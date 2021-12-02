import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {BelajarOnlineComponent} from './belajar-online.component'
const routes: Routes = [
  {
    path: '',
    component: BelajarOnlineComponent
  }
];

@NgModule({
  declarations: [BelajarOnlineComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class BelajarOnlineModule { }
