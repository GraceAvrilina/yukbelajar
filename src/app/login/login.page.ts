import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { ModalController,LoadingController,ToastController,Platform,AlertController } from "@ionic/angular";
import { ModalLupaPswdComponent } from "../widget/modal-lupa-pswd/modal-lupa-pswd.component";
import {LoginService} from '../service/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public params: any = {
    email: "",
    password: "",
  }
  passwordType: string = 'password';
 passwordIcon: string = 'eye-off';
  constructor(private router: Router,
    private modalController: ModalController,
    public toastController: ToastController,
    private loginservice: LoginService) { }

  ngOnInit() {
  }

  async userLogin(){
    const param = {
      email: this.params.email,
      password: this.params.password
    };

    const response = await this.loginservice.userLogin(param);
    const { isSuccess, message, data , position} = response;

    if(isSuccess){
      localStorage.setItem("name", data.nama);      
      localStorage.setItem("position", position);
      localStorage.setItem("kd_skl", data.kdskl);
      this.router.navigate(['/home'])  
    }
    else{
      this.presentToast(message)
    }
  }

  
  selectMenu(url) {
    // this.router.navigateByUrl(url)

    let navigationExtras: NavigationExtras = {
      state: {
        reload: true
      }
    }
    this.router.navigate([url], navigationExtras)
  }

  login(url){
    let navigationExtras: NavigationExtras = {
      state: {
        reload: true
      }
    }
    this.router.navigate([url], navigationExtras)
    localStorage.setItem("email", this.params.email)
  }


  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}

  async presentModalForgetPass() {
    const modal = await this.modalController.create({
      component: ModalLupaPswdComponent,
      // componentProps: { value: 123 }
    });

    modal.onDidDismiss().then(res => {});

    return await modal.present();
  }
  
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}