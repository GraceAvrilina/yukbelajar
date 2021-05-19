import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {MainpageComponent} from './mainpage/mainpage.component'
import {ChangePasswordComponent} from './change-password/change-password.component'
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'prefix'
  },
  {
    path: 'home',
    component: MainpageComponent,
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordModule)
  },
  {
    path: 'absensi-siswa',
    loadChildren: () => import('./absensi-siswa/absensi-siswa.module').then( m => m.AbsensiSiswaModule)
  },
  {
    path: 'data-kelas',
    loadChildren: () => import('./data-kelas/data-kelas.module').then( m => m.DataKelasModule)
  },
  {
    path: 'data-mapel',
    loadChildren: () => import('./data-mapel/data-mapel.module').then( m => m.DataMapelModule)
  },
  {
    path: 'data-guru',
    loadChildren: () => import('./data-guru/data-guru.module').then( m => m.DataGuruModule)
  },
  {
    path: 'data-siswa',
    loadChildren: () => import('./data-siswa/data-siswa.module').then( m => m.DataSiswaModule)
  },
  {
    path: 'detail-siswa/:id',
    loadChildren: () => import('./data-siswa/detail-siswa/detail-siswa.module').then( m => m.DetailSiswaModule)
  },
  {
    path: 'export-mapel',
    loadChildren: () => import('./data-mapel/export-excel/export-excel.module').then( m => m.ExportExcelModule)
  },
  {
    path: 'data-staff',
    loadChildren: () => import('./data-staff/data-staff.module').then( m => m.DataStaffModule)
  },
  {
    path: 'setup-info',
    loadChildren: () => import('./setup-info/setup-info.module').then( m => m.SetupInfoModule)
  },
  {
    path: 'pesan-siswa',
    loadChildren: () => import('./pesan-siswa/pesan-siswa.module').then( m => m.PesanSiswaModule)
  },
  {
    path: 'kirim-tugas',
    loadChildren: () => import('./entry-tugas/entry-tugas.module').then( m => m.EntryTugasModule)
  },
  {
    path: 'list-ujian',
    loadChildren: () => import('./list-ujian/list-ujian.module').then( m => m.ListUjianModule)
  },
  {
    path: 'list-ujian/ujian/:id',
    loadChildren: () => import('./list-ujian/ujian/ujian.module').then( m => m.UjianModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,  { useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
