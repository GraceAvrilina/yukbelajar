import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../service/data-kelas.service'


@Component({
  selector: 'app-entry-tugas',
  templateUrl: './entry-tugas.component.html',
  styleUrls: ['./entry-tugas.component.scss'],
})
export class EntryTugasComponent implements OnInit {
  public data:any={
    pesan:'',
    kelas:''
  }
  public dataKelas
  public pesanSiswa:any=[]
  
  constructor(    
    private router:Router,
    public toastController: ToastController,
    private dataKelasService : DataKelasService
  ) { }

  ngOnInit() {
    this.getKelas()
  }

  async getKelas(){
    // this.presentLoadingWithOptions()
    const param={
      kdskl : localStorage.getItem("kd_skl")
    }

    const response = await this.dataKelasService.getDataKelas(param)
    const { isSuccess, message, data } = response

    if(isSuccess){
        this.dataKelas = data
    }
    else{
      this.presentToast(message)
    }

  }

  async onSubmit(val){
      val.stfup= localStorage.getItem("name")
      val.kodeSkl= localStorage.getItem("kd_skl")
      
    const param={
      datanya: val
    }
    const response = await this.dataKelasService.kirimTugas(val)
    const { isSuccess, message} = response

    if(isSuccess){
      this.presentToast(message)
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
    // this.router.navigate(['home'])
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home']);
  }); 
  }
}
