import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { Router, NavigationExtras } from "@angular/router";
import {DataKelasService} from '../service/data-kelas.service'
import { LoadingController,ToastController, AlertController} from "@ionic/angular";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  providers: [DatePipe]
})
export class FolderPage implements OnInit {
  public folder: string;
  public username = null;
  public position = null;
  public nmskl
  public open = false
  
  tglskrg
  now = new Date();
  absensi
  cekAbsen
  msg
  pesan
  level
  isAbsen:boolean=false
  isAdaAbsen:boolean=false

  fileName= 'ExcelSheet.xlsx';  
  constructor(private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private toastController: ToastController,
    private dataKelasService : DataKelasService,
    private router: Router,
    private menu: MenuController,) {
      if(!localStorage.getItem("name")){
        let navigationExtras: NavigationExtras = {
          state: {
            reload: true
          }
        }
        this.router.navigate(['/'], navigationExtras)
      }
      this.level=localStorage.getItem("position")
      
    }

  ionViewWillEnter(){    
    this.menu.open('end');
  }
  
  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
    this.tglskrg = this.datePipe.transform(this.now, 'yyyy-MM-dd');
    this.username = localStorage.getItem("name")
    this.position = localStorage.getItem("position")
    this.nmskl = localStorage.getItem("nmskl")
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getAbsen()
  }

  
  async getAbsen(){
    const param={
      email : localStorage.getItem("email"),
      kdskl : localStorage.getItem("kd_skl")
    }

    const response = await this.dataKelasService.getAbsen(param)
    const { isSuccess, message } = response

    if(!isSuccess){
      this.isAbsen=true
      let abs
      if(message=='H'){
        this.isAdaAbsen=true
        abs = "Hadir"
      }
      else if(message=='I'){
        this.isAdaAbsen=true
        abs = "Ijin"
      }
      else if(message=='S'){
        this.isAdaAbsen=true
        abs = "Sakit"
      }
      else{
        this.isAdaAbsen=false
        this.pesan = message
      }
      this.msg= abs
      // this.presentToast("Sudah Absen")
    }
    else{
      this.isAbsen=false
      this.isAdaAbsen=true
    }

  }
  async onSubmit(){
    console.log(this.absensi)
    const param={
      email : localStorage.getItem("email"),
      ket : this.absensi
    }

    const response = await this.dataKelasService.Absen(param)
    const { isSuccess, message } = response

    if(isSuccess){
      this.presentToast(message)
      this.isAbsen=true
      let abs
      if(this.absensi=='H'){
        abs = "Hadir"
      }
      else if(this.absensi=='I'){
        abs = "Ijin"
      }
      else if(this.absensi=='S'){
        abs = "Sakit"
      }
      this.msg= abs
    }else{
      this.isAbsen=false
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
  
  openFirst() {
    this.menu.enable(true, 'first')
    this.menu.open('first')
    this.open = true
  }

  closeFirst() {
    this.menu.enable(true, 'first')
    this.menu.close('first')
    this.open = false
  }

  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }
}
