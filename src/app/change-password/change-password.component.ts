import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { MenuController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {PasswordService} from '../service/password.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public params: any = {
    username: "",
    password: "",
    username_new: "",
    password_new: "",
    password_new_confirm: "",
  }
  public folder: string;
  public open = false

  @ViewChild('passwdForm', {static:false}) passwdForm: NgForm
  constructor(private menu: MenuController,
    private router: Router,
    public toastController: ToastController,
    private psswdService: PasswordService,
    private activatedRoute: ActivatedRoute,) { }

  ionViewWillEnter(){    
    this.menu.open('first');
    if(this.passwdForm!= undefined)
    this.passwdForm.reset()
  }

  ngOnInit() {
    this.reset()
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.passwdForm!= undefined)
    this.passwdForm.reset()
  }

  async changePswrd(){
    const param = {
      username: this.params.username,
      username_new: this.params.username_new,
      password: this.params.password,
      password_new: this.params.password_new,
      password_new_confirm: this.params.password_new_confirm
    };

    const response = await this.psswdService.changePsswd(param);
    const { isSucces, message} = response;

    if(isSucces){
      this.presentToast(message)
      this.reset()
      this.close()
    }
    else{
      this.presentToast(message)
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  reset(){
    this.params.username = null
    this.params.username_new = null
    this.params.password = null
    this.params.password_new = null
    this.params.password_new_confirm = null
  }

  close() {
    this.router.navigate(['home'])
  }
}
