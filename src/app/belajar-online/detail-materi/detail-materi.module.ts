import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {DetailMateriComponent} from '../detail-materi/detail-materi.component'


const routes: Routes = [
  {
    path: '',
    component: DetailMateriComponent
  }
];

@NgModule({
  declarations: [DetailMateriComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DetailMateriModule { }
