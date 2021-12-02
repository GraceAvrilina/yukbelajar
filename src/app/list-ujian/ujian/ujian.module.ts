import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {UjianComponent} from './ujian.component'
import { CountdownModule } from 'ngx-countdown';

const routes: Routes = [
  {
    path: '',
    component: UjianComponent
  }
];

@NgModule({
  declarations: [UjianComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CountdownModule,
    // BackButtonDisableModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class UjianModule { }
