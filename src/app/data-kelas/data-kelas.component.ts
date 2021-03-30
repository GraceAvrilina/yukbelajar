import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../service/data-kelas.service'

@Component({
  selector: 'app-data-kelas',
  templateUrl: './data-kelas.component.html',
  styleUrls: ['./data-kelas.component.scss'],
})
export class DataKelasComponent implements OnInit {

  public dataSkl:any={
    kdSkl:"",
    namaSkl:"",
    noijin:"",
    kepsek:"",
    tingkat:"",
    stts:"",
    almt:"",
    kota:""
  }
  public dataSekolah
  public dataKelas
  public isDetail:boolean = false
  public isDetailKls:boolean = false
  public isEdit:boolean = false

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    public toastController: ToastController,
    private dataKelasService : DataKelasService) { }

  ngOnInit() {
    this.getDataSkl()
    this.getKelas()
  }

  close() {
    this.router.navigate(['home'])
  }

  async getDataSkl(){
    const param={
      kdskl : localStorage.getItem("kd_skl")
    }

    const response = await this.dataKelasService.getDataSkl(param)
    const { isSuccess, message, data } = response

    if(isSuccess){
      this.dataSekolah=data
      this.dataSkl.kdSkl= data[0].kodeSkl
      this.dataSkl.namaSkl= data[0].namaSkl
      this.dataSkl.noijin= data[0].detail.noijin
      this.dataSkl.kepsek= data[0].detail.kepsek
      this.dataSkl.tingkat= data[0].detail.tingkat
      this.dataSkl.stts= data[0].detail.stts
      this.dataSkl.almt= data[0].detail.almt
      this.dataSkl.kota= data[0].detail.kota
    }
    else{
      this.presentToast(message)      
    }
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
    }
    else{
      this.presentToast(message)
    }

  }

  async delData(item){
    const param={
      kdskl: item.kodeSkl,
      kelas: item.kelas
    }
    const response = await this.dataKelasService.delDataKls(param)
    const { isSuccess, message } = response

    if(isSuccess){
      this.presentToast(message) 
      this.getKelas()
    }
    else
    this.presentToast(message) 
  }

  async submitForm(){

    const param={
      kdSkl: this.dataSkl.kdSkl,
      namaSkl: this.dataSkl.namaSkl,
      ijin: this.dataSkl.noijin,
      kepsek: this.dataSkl.kepsek,
      tingkat: this.dataSkl.tingkat,
      status: this.dataSkl.stts,
      alamat: this.dataSkl.almt,
      kota: this.dataSkl.kota
    }
    const response = await this.dataKelasService.editDataSkl(param)
    const { isSuccess, message } = response

    if(isSuccess){
      this.presentToast(message) 
    }
    else
    this.presentToast(message) 
  }

  setDetail(number){
    if(number==1){
      this.isDetail = true
      this.isDetailKls = false 
    }
    else if(number==2){
      this.isDetailKls = true
      this.isDetail = false
    }
    else {
      this.isDetail = false
      this.isDetailKls = false
    }
  }

  setEdit(number){
    if(number==1){
      this.isEdit = true
    }
    else{
      this.isEdit = false
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

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  
  async confirmSignOut() {
    const alert = await this.alertController.create({
      header: '',
      message: 'Apakah anda menyimpannya?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {}
        },
        {
          text: 'Ya',
          handler: () => {
            this.submitForm()
            // this.storageService.clearStorage(() => {
              this.router.navigateByUrl('home')
            // })
          }
        }
      ]
    })

    await alert.present()
  }
  
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      // spinner: null,
      message: 'Mohon Tunggu...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
      // duration: 4000
      // backdropDismiss: true
    });
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed with role:', role);
  }

  async missLoading(){
    const loading = await this.loadingController.create({
      // spinner: null,
      message: 'Mohon Tunggu...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
      // duration: 4000
      // backdropDismiss: true
    });
    await loading.onDidDismiss();
    // console.log('Loading dismissed with role:', role);

  }
}
