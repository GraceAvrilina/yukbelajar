import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../service/data-kelas.service'

@Component({
  selector: 'app-data-mapel',
  templateUrl: './data-mapel.component.html',
  styleUrls: ['./data-mapel.component.scss'],
})
export class DataMapelComponent implements OnInit {
  public data:any ={
    kodeSkl:'',
    mapel:''
  }

  public dataSekolah
  public datamapel
  public kdSkl

  position=''

  public isDetail:boolean = false
  constructor(private router:Router,
    public toastController: ToastController,
    private dataKelasService : DataKelasService) {
      this.position = localStorage.getItem("position")
    }

  ngOnInit() {
    this.getSekolah()

    if(this.position != 'ADMSKL'){
      this.getMapel()
    }
  }

  async getSekolah(){
    const param={
      kdskl : localStorage.getItem("kd_skl")
    }

    const response = await this.dataKelasService.getDataSkl(param)
    const { isSuccess, message, data } = response

    if(isSuccess){
    // this.missLoading()
        this.dataSekolah = data
        // console.log(this.dataSekolah)
    }
    else{
      this.presentToast(message)
    }

  }

  async getMapel(){
    const param={
      kdskl : localStorage.getItem("kd_skl")
    }

    const response = await this.dataKelasService.getDataMapel(param)
    const { isSuccess, message, data } = response

    if(isSuccess){
    // this.missLoading()
        this.datamapel = data
        // console.log(this.datamapel)
    }
    else{
      this.presentToast(message)
    }

  }

  async submitData(){
    const param={
      kdskl: this.data.kodeSkl,
      mapel: this.data.mapel.toUpperCase()
    }
    
    const response = await this.dataKelasService.addDataMapel(param)
    const { isSuccess, message } = response

    if(isSuccess){
      this.presentToast(message)
    }
    else{
      this.presentToast(message)
    }
  }

  
  async delData(item){
    const param={
      kdskl: item.kdskl,
      kd: item.kd
    }
    const response = await this.dataKelasService.delDataMapel(param)
    const { isSuccess, message } = response

    if(isSuccess){
      this.presentToast(message) 
      this.getMapel()
    }
    else
    this.presentToast(message) 
  }

  getList(number){
    if(number == 1){
      this.isDetail = true
      this.getMapel()
    }
    else{
      this.isDetail = false
    }
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
}
