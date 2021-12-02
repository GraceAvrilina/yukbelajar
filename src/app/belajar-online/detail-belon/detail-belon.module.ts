import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {DetailBelonComponent} from './detail-belon.component'


const routes: Routes = [
  {
    path: '',
    component: DetailBelonComponent
  }
];

@NgModule({
  declarations: [DetailBelonComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DetailBelonModule { }