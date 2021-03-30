import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import {DataKelasComponent} from './data-kelas.component'

const routes: Routes = [
  {
    path: '',
    component: DataKelasComponent
  },{
    path:'tambah-kelas',
    loadChildren: () => import('../tambah-kelas/tambah-kelas.module').then( m => m.TambahKelasModule)
  }
];

@NgModule({
  declarations: [DataKelasComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DataKelasModule { }
