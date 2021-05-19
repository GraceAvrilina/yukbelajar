import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {DataKelasService} from '../service/data-kelas.service'
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-setup-info',
  templateUrl: './setup-info.component.html',
  styleUrls: ['./setup-info.component.scss'],
})
export class SetupInfoComponent implements OnInit {

  public dataSekolah
  public valSpp
  public valAbsensi
  constructor(
    private router:Router,
    public toastController: ToastController,
    private dataKelasService : DataKelasService
  ) { }

  ngOnInit() {
    this.getSekolah()
  }

  async getSekolah(){
    const param={
      kdskl : localStorage.getItem("kd_skl")
    }

    const response = await this.dataKelasService.getDataSkl(param)
    const { isSuccess, message, data } = response

    if(isSuccess){
    // this.missLoading()
        this.dataSekolah = data[0].namaSkl
    }
    else{
      this.presentToast(message)
    }

  }

  onSubmit(){
    console.log(this.valAbsensi)
  }

  selectSpp(val, no){
    if(val=='aktif' && no ==1) this.valSpp= 'OK'
    else this.valSpp= 'NO'
    
    if(val=='aktif' && no ==2) this.valAbsensi= 'OK'
    else this.valAbsensi= 'NO'
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
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

  close() {
    // this.router.navigate(['home'])
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home']);
  }); 
  }
}
