import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {DetailSiswaComponent} from './detail-siswa.component'


const routes: Routes = [
  {
    path: '',
    component: DetailSiswaComponent
  }
];


@NgModule({
  declarations: [DetailSiswaComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DetailSiswaModule { }
