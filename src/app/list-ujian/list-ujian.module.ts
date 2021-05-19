import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {ListUjianComponent} from './list-ujian.component'

const routes: Routes = [
  {
    path: '',
    component: ListUjianComponent
  }
];

@NgModule({
  declarations: [ListUjianComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ListUjianModule { }
