import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../service/data-kelas.service'
import * as XLSX from 'xlsx';  
import * as firebase from 'firebase';
import {auth} from 'firebase';

@Component({
  selector: 'app-data-guru',
  templateUrl: './data-guru.component.html',
  styleUrls: ['./data-guru.component.scss'],
})
export class DataGuruComponent implements OnInit {

  fileUploaded: File;  
  worksheet: any;
  storeData: any; 
  jsonData: any;   

  public data:any = []
  public isidata:any ={
    kodeSekolah:'',
    namaSekolah:'',
    nis:'',
    nama:'',
    kelas:'',
    email:'',
    stfup:'',
    level:''
  }

  position=""
  isDelSkl:boolean = false
  isDelKls:boolean = false
  isDelSiswa:boolean = false
  isEdit:boolean = false
  // admin:any
  
  public dataKelas
  mySubscription: any;
  datanya:any=[]
  public dataSiswa:any

  constructor(
    private router:Router,
    // private admin:auth,
    private alertController: AlertController,
    private toastController: ToastController,
    private dataKelasService : DataKelasService
  ) { }


  uploadedFile(event) {  
    this.fileUploaded = event.target.files[0];  
    this.readExcel();  
  }  
  readExcel() {  
    let readFile = new FileReader();  
    readFile.onload = (e) => {  
      this.storeData = readFile.result;  
      var data = new Uint8Array(this.storeData);  
      var arr = new Array();  
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);  
      var bstr = arr.join("");  
      var workbook = XLSX.read(bstr, { type: "binary" });  
      var first_sheet_name = workbook.SheetNames[0];  
      this.worksheet = workbook.Sheets[first_sheet_name];
    }  
    readFile.readAsArrayBuffer(this.fileUploaded);  
  } 
  
  registerAuth(email, password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
  }

  async getSekolah(){
    const param={
      kdskl : localStorage.getItem("kd_skl")
    }

    const response = await this.dataKelasService.getDataSkl(param)
    const { isSuccess, message, data } = response

    if(isSuccess){
    // this.missLoading()
        this.isidata.namaSekolah = data[0].namaSkl
        console.log(this.isidata.namaSekolah)
    }
    else{
      this.presentToast(message)
    }

  }

readAsJson() {  
  this.jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });  
  this.jsonData = JSON.stringify(this.jsonData);
  console.log(this.jsonData)
  let arr = JSON.parse(this.jsonData)

 console.log(arr)  
  arr.forEach(val => {
    delete val.No
    this.isidata.kodeSekolah = val.kdskl
    this.isidata.nis = val.nip
    this.isidata.nama = val.nama
    // this.isidata.kelas = val.kelas

    //buat sendiri
    this.isidata.stfup = localStorage.getItem('name')
    let emailnya = val.nama.replace(/\s/g, "").substr(0,4).toLowerCase()
    this.isidata.email = emailnya+'_'+val.kdskl+'_'+val.nip+'@sci.com'
    let password = emailnya+val.nip
    this.isidata.level = val.level.toUpperCase()
    
    val.stfup = localStorage.getItem('name')
    val.email = emailnya+'_'+val.kdskl+'_'+val.nip+'@sci.com'
    val.psswd = emailnya+val.nip
    val.level= val.level.toUpperCase()
    
    if(!val.hasOwnProperty("mapel2")){
      val.mapel2 = ''
    }
    if(!val.hasOwnProperty("mapel3")){
      val.mapel3 = ''
    }
    if(!val.hasOwnProperty("kt")){
      val.kt = ''
    }
    if(!val.hasOwnProperty("nohp")){
      val.nohp = ''
    }
    if(!val.hasOwnProperty("kelas")){
      val.kelas = ''
    }
    else{
      this.isidata.kelas = val.kelas
      val.kls = val.kelas
    }

    this.data.push(val)
    
    // register to firebase auth
    this.registerAuth(this.isidata.email, password)
    
    // save to realtime dbfirebase 
    const newRoomUser = firebase.database().ref('Users/').push();
    newRoomUser.set(this.isidata);

  });
  console.log(this.isidata)
}   
ngOnInit() {
  this.getSekolah()
  this.getKelas()
  this.position = localStorage.getItem("position")
}

async submitData(){
  this.readAsJson()
  const param={
    datanya : this.data
  }

  console.log(param)
  const response = await this.dataKelasService.exportDataGuru(param)
  const { isSuccess, message } = response

  if(isSuccess){
    this.presentToast(message)
    this.data = []
    this.isidata = {}
  }
  else{
    this.presentToast(message)
    this.data = []
    this.isidata = {}
  }
}

async removeSiswaBySkl(){  
  const kodeSekolah = localStorage.getItem("kd_skl")
  
  const param={
    kdskl : kodeSekolah,
    tipe : 'persekolah',
    siswa : '',
    kelas : ''
  }

  const response = await this.dataKelasService.removeSiswa(param)
  const { isSuccess, message, data } = response

  if(isSuccess){
    this.presentToast(message)
  }
  else{
    this.presentToast(message)
  }

  firebase.database().ref('Users/').once('value', (resp: any) => {
    let data = [];
    data = snapshotToArray(resp);

    data.forEach(val => {
      if(val.kodeSekolah == kodeSekolah && val.level == 'SISWA'){
        this.datanya.push(val)
      }
    });
    this.datanya.forEach(val => {         
      const tes = firebase.database().ref('Users/' + val.key);
      // tes.update({message: 'yahoo'});
      tes.remove()
    });
    this.presentToast("Data Terhapus")
    this.isDelKls = false
    this.datanya= []
  });
}

removeSiswaByKls(){
  this.isDelKls= true
  this.isDelSiswa = false  
  this.isDelSkl = false  
}

removeSiswa(){
  this.isDelKls= false
  this.isDelSiswa = true  
  this.isDelSkl = false  
}

async delSiswaKls(item){
  const kelas = item
  
  const param={
    kdskl : localStorage.getItem("kd_skl"),
    tipe : 'perkelas',
    siswa : '',
    kelas : kelas
  }

  const response = await this.dataKelasService.removeSiswa(param)
  const { isSuccess, message, data } = response

  if(isSuccess){
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
    this.isDelKls = false
    this.datanya= []
    
    // this.confirmDelSswKls()
    // let dtkls = data.find(x => x.kelas === kelas);
    // if (dtkls !== undefined) {
    //   const tes = firebase.database().ref('Users/' + dtkls.key);
    //   // tes.update({message: 'yahoo'});
    //   tes.remove()
    //   this.presentToast("Data Terhapus")
    //   this.isDelKls = false
    // }
  });
  
}


async confirmDelSswKls() {
  const alert = await this.alertController.create({
    header: '',
    message: 'Apakah anda yakin ingin menghapus data satuu kelas?',
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
          this.datanya.forEach(val => {    
            const tes = firebase.database().ref('Users/' + val.key);
            // tes.update({message: 'yahoo'});
            tes.remove()
          });
            this.presentToast("Data Terhapus")
            this.isDelKls = false
            this.datanya= null
        }
      }
    ]
  })

  await alert.present()
}

editSiswa(){
  this.isEdit = true
  localStorage.setItem("isEdit", "true")
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