import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../service/data-kelas.service'

@Component({
  selector: 'app-tambah-kelas',
  templateUrl: './tambah-kelas.component.html',
  styleUrls: ['./tambah-kelas.component.scss'],
})
export class TambahKelasComponent implements OnInit {

  public kelas
  constructor(private router:Router,
    public toastController: ToastController,
    private dataKelasService : DataKelasService) { }

  ngOnInit() {}

  async addKelas(){
    const param={
      kdskl : localStorage.getItem("kd_skl"),
      kelas: this.kelas
    }

    const response = await this.dataKelasService.addDataKls(param)
    const { isSuccess, message, status} = response

    if(isSuccess){
      if(status=='ok')
      this.presentToast(message)
      let navigationExtras: NavigationExtras = {
        state: {
          reload: true
        }
      }
      this.router.navigate(['data-kelas'], navigationExtras).then(() => {
        window.location.reload();
      });
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

  close() {
    this.router.navigate(['data-kelas'])
  }
}
