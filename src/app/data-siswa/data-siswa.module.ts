import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataSiswaComponent} from './data-siswa.component'
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'


const routes: Routes = [
  {
    path: '',
    component: DataSiswaComponent
  }
];

@NgModule({
  declarations: [DataSiswaComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DataSiswaModule { }
