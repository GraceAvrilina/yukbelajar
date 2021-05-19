import { Component, OnInit } from '@angular/core';
import {DataSiswaComponent} from '../data-siswa.component'
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../../service/data-kelas.service'
import * as firebase from 'firebase';

@Component({
  selector: 'app-detail-siswa',
  templateUrl: './detail-siswa.component.html',
  styleUrls: ['./detail-siswa.component.scss'],
  providers:[DataSiswaComponent]
})
export class DetailSiswaComponent implements OnInit {

  data:any
  dataDetail:any
  dataSiswa
  isEdit
  isDetail:boolean=false

  datanya:any=[]
  constructor(private dtSiswa: DataSiswaComponent, 
    private _Activatedroute:ActivatedRoute,
    private router:Router,
    private toastController: ToastController,
    private dataKelasService : DataKelasService) { }

  ngOnInit() {
    // this.data = this.dtSiswa.dataSiswa
    this.data=this._Activatedroute.snapshot.paramMap.get("id");
    this.isEdit = localStorage.getItem("isEdit")
    console.log(this.data)
    this.getSiswa()
  }

  
async getSiswa(){
  // this.presentLoadingWithOptions()
  const param={
    kdskl : localStorage.getItem("kd_skl"),
    kls: this.data
  }

  const response = await this.dataKelasService.getDataSiswa(param)
  const { isSuccess, message, data } = response
  
  if(isSuccess){
  // this.missLoading()
      this.dataSiswa = data
      this.dataSiswa.forEach(val => {
        val.nmssw = this.capitalize(val.nmssw)
      });
      console.log(this.dataSiswa)
  }
  else{
    this.presentToast(message)
  }

}

async viewSiswa(item){
console.log(item)
const param={
  kdskl : localStorage.getItem("kd_skl"),
  kls : item.kls,
  nis : item.nis
}

const response = await this.dataKelasService.detailSiswa(param)
const { isSuccess, message, data } = response

if(isSuccess){
  this.dataDetail = data
  this.isDetail = true
  console.log(this.dataDetail)
}
else{
  this.presentToast(message)
}
}

async delSiswaKls(item){
  const kelas = item.kls
  const nama = item.nmssw
  
  const param={
    kdskl : localStorage.getItem("kd_skl"),
    tipe : 'persiswa',
    siswa : nama,
    kelas : kelas
  }

  const response = await this.dataKelasService.removeSiswa(param)
  const { isSuccess, message, data } = response

  if(isSuccess){
    this.router.navigate(['data-siswa'])
    this.presentToast(message)
  }
  else{
    this.presentToast(message)
  }

  firebase.database().ref('Users/').once('value', (resp: any) => {
    let data = [];
    data = snapshotToArray(resp);

    data.forEach(val => {
      if(val.kelas == kelas && val.level == 'SISWA'){
        this.datanya.push(val)
      }
    });
    this.datanya.forEach(val => {         
      const tes = firebase.database().ref('Users/' + val.key);
      // tes.update({message: 'yahoo'});
      tes.remove()
    });
    this.presentToast("Data Terhapus")
    this.datanya= []

  });
  
}


async submitData(item){
  console.log(item)
  const param={
    kdSkl : localStorage.getItem("kd_skl"),
    nis : item[0].nis,
    namaSiswa : item[0].nmssw
  }

  console.log(param)
  const response = await this.dataKelasService.editSiswa(param)
  const { isSuccess, message } = response

  if(isSuccess){
    this.presentToast(message)
    localStorage.removeItem('isEdit');
    this.isEdit = false
    // this.data = []
  }
  else{
    this.presentToast(message)
  }
}

capitalize(word) {
  const loweredCase = word.toLowerCase();
  return word[0].toUpperCase() + loweredCase.slice(1);
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

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};