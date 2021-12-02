import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../service/data-kelas.service'
import * as XLSX from 'xlsx';  
import * as firebase from 'firebase';
import {auth} from 'firebase';

@Component({
  selector: 'app-data-siswa',
  templateUrl: './data-siswa.component.html',
  styleUrls: ['./data-siswa.component.scss'],
})
export class DataSiswaComponent implements OnInit {

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
  isPass:boolean = false
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


  ngOnInit() {
    this.getSekolah()
    this.getKelas()
    this.position = localStorage.getItem("position")
  }
  
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
  

  async getSekolah(){
    const param={
      kdskl : localStorage.getItem("kd_skl")
    }

    const response = await this.dataKelasService.getDataSkl(param)
    const { isSuccess, message, data } = response

    if(isSuccess){
    // this.missLoading()
        this.isidata.namaSekolah = data[0].namaSkl
        // console.log(this.isidata.namaSekolah)
    }
    else{
      this.presentToast(message)
    }

  }

readAsJson() {  
  this.jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });  
  this.jsonData = JSON.stringify(this.jsonData);
  // console.log(this.jsonData)
  let arr = JSON.parse(this.jsonData)

//  console.log(arr)  
  arr.forEach(val => {
    delete val.No
    this.isidata.kodeSekolah = val.kdskl
    this.isidata.nis = val.nis
    this.isidata.nama = val.nama
    this.isidata.kelas = val.kls
    //buat sendiri
    this.isidata.stfup = localStorage.getItem('name')
    let emailnya = val.nama.replace(/\s/g, "").substr(0,4).toLowerCase()
    this.isidata.email = emailnya+'_'+val.kdskl+'_'+val.nis+'@sci.com'
    let password = emailnya+val.nis
    this.isidata.level = 'SISWA'
    
    val.stfup = localStorage.getItem('name')
    val.email = emailnya+'_'+val.kdskl+'_'+val.nis+'@sci.com'
    val.psswd = emailnya+val.nis
    this.data.push(val)

    // save to realtime dbfirebase 
    // const newRoomUser = firebase.database().ref('Users/').push();
    // newRoomUser.set(this.isidata);
    // let key= '0JQv2bI5UVVN5a8uEg4UjEl6AKG2'
    // const newRoomUser = firebase.database().ref('User/')
    // newRoomUser.child(key).set(this.isidata);
    
    // register to firebase auth
    // this.registerAuth(this.isidata.email, password)
    
  });
  // console.log(this.isidata)
} 

registerAuth(email, password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    var userId= userCredential.user.uid;
      
    firebase.database().ref('Users/').orderByChild('email').equalTo(email).once('value', snapshot => {
      if (snapshot.exists()) {
        let rooms = [];
        rooms = snapshotToArray(snapshot);
        // console.log(rooms)
        
        rooms.forEach(val => {         
          const tes = firebase.database().ref('Users/' + val.key);
          // tes.update({stfup: 'DILUC'});
          tes.update({id: userId});
        });
      } 
    });
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
  }  

async submitData(){
  this.readAsJson()
  const param={
    datanya : this.data
  }

  // console.log(param)
  const response = await this.dataKelasService.exportDataSiswa(param)
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

passSiswa(){
  this.isPass = true
  localStorage.setItem("isPass", "true")
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
      this.router.navigate(['home'])
      // .then(() => {
      //   window.location.reload();
      // });
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