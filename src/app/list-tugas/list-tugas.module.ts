import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {ListTugasComponent} from './list-tugas.component'

const routes: Routes = [
  {
    path: '',
    component: ListTugasComponent
  }
];

@NgModule({
  declarations: [ListTugasComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ListTugasModule { }
