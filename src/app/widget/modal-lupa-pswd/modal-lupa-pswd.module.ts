import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ModalLupaPswdComponent} from './modal-lupa-pswd.component'

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModalLupaPswdComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ModalLupaPswdModule { }
