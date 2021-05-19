import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../../service/data-kelas.service'
import * as XLSX from 'xlsx';  
import * as firebase from 'firebase';

@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.scss'],
})
export class ExportExcelComponent implements OnInit {

  fileUploaded: File;  
  worksheet: any;
  storeData: any; 
  jsonData: any;   

  public data:any = []
  public isidata:any ={
    kdSkl:'',
    mapel:''
  }

  constructor(private router:Router,
    private toastController: ToastController,
    private dataKelasService : DataKelasService) { }

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
    
  readAsJson() {  
    this.jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });  
    this.jsonData = JSON.stringify(this.jsonData).replace(/\s/g, "_");  
    console.log(this.jsonData)
    let arr = JSON.parse(this.jsonData)

   console.log(arr)  
    arr.forEach(val => {
      delete val.No
      this.isidata.kdSkl = val.kdskl
      this.isidata.mapel = val.nama_mapel
      this.data.push(val)
      const newRoomUser = firebase.database().ref('roomusers/').push();
      newRoomUser.set(this.isidata);
    });
    console.log(this.data)
  }   
  ngOnInit() {}
  
  async submitData(){
    this.readAsJson()
    const param={
      datanya : this.data
    }

    const response = await this.dataKelasService.exportDataMapel(param)
    const { isSuccess, message } = response

    if(isSuccess){
      this.presentToast(message)
      this.data = []
      this.isidata = {}
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
