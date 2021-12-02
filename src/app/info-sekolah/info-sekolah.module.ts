import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {InfoSekolahComponent} from './info-sekolah.component'
const routes: Routes = [
  {
    path: '',
    component: InfoSekolahComponent
  }
];

@NgModule({
  declarations: [InfoSekolahComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class InfoSekolahModule { }
