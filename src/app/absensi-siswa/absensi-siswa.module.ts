import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {AbsensiSiswaComponent} from './absensi-siswa.component'

const routes: Routes = [
  {
    path: '',
    component: AbsensiSiswaComponent
  }
];

@NgModule({
  declarations: [AbsensiSiswaComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AbsensiSiswaModule { }
