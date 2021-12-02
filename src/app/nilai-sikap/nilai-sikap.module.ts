import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {NilaiSikapComponent} from './nilai-sikap.component'

const routes: Routes = [
  {
    path: '',
    component: NilaiSikapComponent
  }
];

@NgModule({
  declarations: [NilaiSikapComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class NilaiSikapModule { }
