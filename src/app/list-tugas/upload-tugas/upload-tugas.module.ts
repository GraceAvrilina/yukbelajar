import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {UploadTugasComponent} from './upload-tugas.component'

const routes: Routes = [
  {
    path: '',
    component: UploadTugasComponent
  }
];

@NgModule({
  declarations: [UploadTugasComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UploadTugasModule { }
