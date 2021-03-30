import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {EntryTugasComponent} from './entry-tugas.component'

const routes: Routes = [
  {
    path: '',
    component: EntryTugasComponent
  }
];

@NgModule({
  declarations: [EntryTugasComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EntryTugasModule { }
