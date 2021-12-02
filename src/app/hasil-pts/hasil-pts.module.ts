import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {HasilPtsComponent} from './hasil-pts.component'

const routes: Routes = [
  {
    path: '',
    component: HasilPtsComponent
  }
];

@NgModule({
  declarations: [HasilPtsComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HasilPtsModule { }
