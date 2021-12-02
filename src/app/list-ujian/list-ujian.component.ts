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
  listUjian:any[]=[]
  isFinish
  ujianDone
  
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    public toastController: ToastController,
    private dataKelasService : DataKelasService
    ) {
      // window.onbeforeunload = function() 
      // {
      //   localStorage.clear()
      // }
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
    this.getUjianDone()
    this.getUjian()
    this.tglskrg = this.datePipe.transform(this.now, 'yyyy-MM-dd');
    // this.jamskrg = this.datePipe.transform(this.now, 'hh:mm:ss', "Asia/Jakarta");
    let kdskl = localStorage.getItem("kd_skl")
    const wil= kdskl.substr(0,3);
    let now
    if(wil=="511"){
      now = this.convertTZ(this.now, "Asia/Ujung_Pandang")
    }else{
      now = this.convertTZ(this.now, "Asia/Jakarta")
    }
    // let now = this.convertTZ(this.now, "Asia/Ujung_Pandang")
    this.jamskrg = now.getHours() + (now.getMinutes()<10?'0':'') +  now.getMinutes() + (now.getSeconds()<10?'0':'') + now.getSeconds()
    // this.jamskrg = now.getHours() + ":" + (now.getMinutes()<10?'0':'') +  now.getMinutes() + ":" + (now.getSeconds()<10?'0':'') + now.getUTCSeconds()
    this.jamnow = now.getHours()  + (now.getMinutes()<10?'0':'') +  now.getMinutes() 
    // this.jamnow = now.getHours() + ":" + (now.getMinutes()<10?'0':'') +  now.getMinutes() 
    this.jamskrg = Math.ceil(this.jamskrg)
    this.jamnow = Math.ceil(this.jamnow)
    console.log(this.jamskrg, this.jamnow)
  }

  async getUjianDone(){
    
    const param={
      kdskl : localStorage.getItem("kd_skl"),
      induk : localStorage.getItem("induk")
    }

    const response = await this.dataKelasService.getUjianDone(param)
    const { isSuccess, message, data } = response

    if(isSuccess){
        this.ujianDone = data
    }
    else{
      this.ujianDone=[]
    }
    console.log(this.ujianDone)
  }

  async getUjian(){
    // this.presentLoadingWithOptions()
    const param={
      kdskl : localStorage.getItem("kd_skl"),
      email : localStorage.getItem("email"),
      kls : localStorage.getItem("jurusan")
    }

    const response = await this.dataKelasService.getListUjian(param)
    const { isSuccess, message, data } = response

    if(isSuccess=='ok' || isSuccess){
        this.listUjian = data
        // console.log(isSuccess)
        // console.log(data)

        // var strjamnow = Date.parse(this.jamnow.toString())
        // console.log(strjamnow)
        // console.log(this.jamnow.toString())
        console.log()
        var re = /:/gi;
        var newstr = data[0].wktfinish.replace(re, "")
        console.log(newstr)

        // if(this.jamnow > Math.ceil(newstr)){
        //   this.listUjian = []
        //   this.noUjian = true
        // }
        // else{
          this.listUjian.forEach(val => {
            var re = /:/gi;
            var start = val.wktstart.replace(re, "")
            var end = val.wktfinish.replace(re, "")
            val.wktstartx = Math.ceil(start)
            val.wktfinishx = Math.ceil(end)
            
            if(this.ujianDone != []){
              this.ujianDone.forEach(element => {
                if(val.kdsoal == element.kdsoal){
                  val.done = "done"
                }
                // else{
                //   val.done = ""
                // }
              });
            }
            
            if(!val.hasOwnProperty("done")){
              val.done = ''
            }
          });
        // }
        
        console.log(this.listUjian)
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
      this.router.navigate(['home'])
      // .then(() => {
      //   window.location.reload();
      // });
  }); 
  }

  convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
}
