import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import {ChangePasswordComponent} from '../change-password/change-password.component'

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
