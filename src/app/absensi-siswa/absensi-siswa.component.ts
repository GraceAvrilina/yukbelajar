import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';
import {DataKelasService} from '../service/data-kelas.service'
import { LoadingController,ToastController, AlertController} from "@ionic/angular";

@Component({
  selector: 'app-absensi-siswa',
  templateUrl: './absensi-siswa.component.html',
  styleUrls: ['./absensi-siswa.component.scss'],
})
export class AbsensiSiswaComponent implements OnInit {

  public data:any={
    kdSkl:"",
    tipe:"",
    kls:'',
    absen:[]
  }

  public dataKelas
  public dataSiswa
  public dataSekolah
  public dataAbsen
  public tgl
  public isEdit
  public isAbsen
  public isSpp

  public position

  public nominal:any=[]
  public absensiSiswa:any=[]

  constructor(
    private router: Router,
    public toastController: ToastController,
    private dataKelasService : DataKelasService) { }

  ngOnInit() {
    // const moment = require('moment-timezone');
    this.tgl = moment.tz(new Date(), 'Asia/Jakarta').format("DD MMM YY")
    this.position = localStorage.getItem("position")
    
    this.getKelas()
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
        // console.log(this.dataSekolah)
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
  
  async getSiswa(){
    // this.presentLoadingWithOptions()
    const param={
      kdskl : localStorage.getItem("kd_skl"),
      kls: this.data.kls
    }

    const response = await this.dataKelasService.getDataSiswa(param)
    const { isSuccess, message, data } = response
    
    if(isSuccess){
    // this.missLoading()
        this.dataSiswa = data
        this.dataSiswa.forEach(val => {
          val.nmssw = this.capitalize(val.nmssw)
        });
        // console.log(this.dataSiswa)
    }
    else{
      this.presentToast(message)
    }

  }

  
  async getAbsen(){
    // this.presentLoadingWithOptions()
    const param={
      kdskl : localStorage.getItem("kd_skl"),
      kls: this.data.kls
    }

    const resp = await this.dataKelasService.getAbsensi(param)
    const { isSuccess, message, data } = resp
    
    if(isSuccess){
    // this.missLoading()
        this.dataAbsen = data
        this.dataSiswa.forEach((element,index) => {
          this.dataAbsen.forEach(val => {
            if(val.nis == element.nis)
            this.data.absen[index] =  val.absen
          });
        });
        // console.log(this.dataAbsen)
    }
    else{
      this.presentToast(message)
    }

  }

  capitalize(word) {
    const loweredCase = word.toLowerCase();
    return word[0].toUpperCase() + loweredCase.slice(1);
  }

  onSubmit(type){
    if(this.data.tipe == 'absen' && type==1){
      this.isEdit= true
      this.isAbsen= true
      this.isSpp= false
      this.getSiswa()
      this.getAbsen()
    }
    else if(this.data.tipe == 'spp' && type==1){
      this.isEdit= true
      this.isAbsen= false
      this.isSpp= true
      this.getSiswa()
    }
    else{
      this.isEdit= false
      this.isAbsen= false
      this.isSpp= false
    }
  }

  async onSubmitAbsen(data){
    this.dataSiswa.forEach((val,index) => {
      if(data[index] != undefined)
      val.abs = data[index]
      else
      val.abs = "masuk"
    });
    this.dataSiswa.forEach((element,i) => {
      if(element.abs != 'masuk'){
        this.absensiSiswa.push(this.dataSiswa[i])
      }
    });

    this.absensiSiswa.forEach(v => {
      v.stfup= localStorage.getItem("name"),
      v.nmskl = this.dataSekolah
    });
    
    const param={
      datanya: this.absensiSiswa
    }
    // console.log(param)
    const response = await this.dataKelasService.addAbsensi(param)
    const { isSuccess, message} = response

    if(isSuccess){
      this.onSubmit(0)
      this.presentToast(message)
      this.data.absen= []
    }
    else{
      this.presentToast(message)
    }
  }
  
  async onSubmitBayar(data){
    this.dataSiswa.forEach((val,index) => {
      if(data[index] != undefined)
      val.nominal = data[index]
      else
      val.abs = "masuk"
    });
    this.dataSiswa.forEach((element,i) => {
      if(element.abs != 'masuk'){
        this.absensiSiswa.push(this.dataSiswa[i])
      }
    });

    this.absensiSiswa.forEach(v => {
      v.stfup= localStorage.getItem("name"),
      v.nmskl = this.dataSekolah
    });
    console.log(this.absensiSiswa)
    
    const param={
      datanya: this.absensiSiswa
    }
    const response = await this.dataKelasService.addSpp(param)
    const { isSuccess, message} = response

    if(isSuccess){
      this.onSubmit(0)
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
    this.router.navigate(['home'])
  }
}
