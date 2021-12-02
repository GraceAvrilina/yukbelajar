import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {HasilPasComponent} from './hasil-pas.component'


const routes: Routes = [
  {
    path: '',
    component: HasilPasComponent
  }
];

@NgModule({
  declarations: [HasilPasComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HasilPasModule { }
