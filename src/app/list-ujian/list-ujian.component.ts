import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {DataKelasService} from '../service/data-kelas.service'
import { LoadingController,ToastController, AlertController} from "@ionic/angular";

@Component({
  selector: 'app-list-ujian',
  templateUrl: './list-ujian.component.html',
  styleUrls: ['./list-ujian.component.scss'],
  providers: [DatePipe]
})
export class ListUjianComponent implements OnInit {

  now = new Date();
  tglskrg
  jamskrg
  jamnow
  noUjian:boolean = false
  listUjian:any
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    public toastController: ToastController,
    private dataKelasService : DataKelasService
    ) { }

  ngOnInit() {
    this.getUjian()
    this.tglskrg = this.datePipe.transform(this.now, 'yyyy-MM-dd');
    // this.jamskrg = this.datePipe.transform(this.now, 'hh:mm:ss', "Asia/Jakarta");
    let now = this.convertTZ(this.now, "Asia/Jakarta")
    this.jamskrg = now.getHours() + ":" + (now.getMinutes()<10?'0':'') +  now.getMinutes() + ":" + (now.getSeconds()<10?'0':'') + now.getUTCSeconds()
    this.jamnow = now.getHours() + ":" + (now.getMinutes()<10?'0':'') +  now.getMinutes() 
    console.log(this.jamskrg, this.jamnow)
  }

  async getUjian(){
    // this.presentLoadingWithOptions()
    const param={
      kdskl : localStorage.getItem("kd_skl"),
      kls : "10"
    }

    const response = await this.dataKelasService.getListUjian(param)
    const { isSuccess, message, data } = response

    if(isSuccess){
        this.listUjian = data
    }
    else{
      this.presentToast(message)
      this.noUjian = true
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

  convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
}
