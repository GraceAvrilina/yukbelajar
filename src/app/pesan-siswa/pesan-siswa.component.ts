import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../service/data-kelas.service'

@Component({
  selector: 'app-pesan-siswa',
  templateUrl: './pesan-siswa.component.html',
  styleUrls: ['./pesan-siswa.component.scss'],
})
export class PesanSiswaComponent implements OnInit {
  public data:any={
    pesan:''
  }
  public dataKelas
  public pesanSiswa:any=[]
  
  automaticClose = false;
  isOpen = false;

  isIndeterminate:boolean;
  masterCheck:boolean;

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
    // this.missLoading()
        this.dataKelas = data
        this.dataKelas.map(x => x.isChecked = false)
    }
    else{
      this.presentToast(message)
    }

  }
  

  toogleSection(val){
    this.isOpen = !this.isOpen
    if(this.automaticClose && this.isOpen) {
      this.isOpen=true
    }
    // else this.isOpen=false
    
  }

checkMaster($event) {
  console.log($event)
    setTimeout(()=>{
      this.dataKelas.forEach(obj => {
        obj.isChecked = this.masterCheck;
      });
    });
  }

  checkEvent() {
    const totalItems = this.dataKelas.length;
    let checked = 0;
    this.dataKelas.map(obj => {
      if (obj.isChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }
  
  async onSubmit(){
    this.dataKelas.forEach(val => {
      val.psn = this.data.pesan
      val.stfup= localStorage.getItem("name")
    });
    this.dataKelas.forEach((element,i) => {
      if( element.isChecked){
        this.pesanSiswa.push(this.dataKelas[i])        
      }
    });

    console.log(this.pesanSiswa)

    const param={
      datanya: this.pesanSiswa
    }
    const response = await this.dataKelasService.kirimPesan(param)
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
      this.router.navigate(['home'])
      // .then(() => {
      //   window.location.reload();
      // });
  }); 
  }
}
