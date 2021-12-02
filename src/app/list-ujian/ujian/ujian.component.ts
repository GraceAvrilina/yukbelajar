import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DataKelasService} from '../../service/data-kelas.service'
import {ToastController} from "@ionic/angular";
import {CountdownComponent} from 'ngx-countdown'
import * as moment from 'moment';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-ujian',
  templateUrl: './ujian.component.html',
  styleUrls: ['./ujian.component.scss'],
})
export class UjianComponent implements OnInit {
  number = 1
  totalsoal = 0
  data
  nosoal
  nourut 
  jwbn
  score
  soal:any
  link:any=[]

  isLinkAva:boolean = false
  isUjianText:boolean = false
  
  now = new Date();
  jamnow
  endwkt
  tempo:number
  notifyConfig:any = {}
  
  @ViewChild(CountdownComponent) private countdown: CountdownComponent;
  constructor(
    private router: Router,
    public toastController: ToastController,
    private dataKelasService : DataKelasService,
    public sanitizer: DomSanitizer,
    private _Activatedroute:ActivatedRoute,
      ) {
      this.data=this._Activatedroute.snapshot.paramMap.get("id");
    }

  ngOnInit() {
    this.startUjian()
    this.getUjian()
    let kdskl = localStorage.getItem("kd_skl")
    const wil= kdskl.substr(0,3);
    let now
    if(wil=="511"){
      now = this.convertTZ(this.now, "Asia/Ujung_Pandang")
    }else{
      now = this.convertTZ(this.now, "Asia/Jakarta")
    }
    // let now = this.convertTZ(this.now, "Asia/Jakarta")
    this.jamnow = now.getHours() + (now.getMinutes()<10?'0':'') +  now.getMinutes()
    this.jamnow = Math.ceil(this.jamnow)
    // this.jamnow = now.getHours() + ":" + (now.getMinutes()<10?'0':'') +  now.getMinutes()

  }

  async startUjian(){    
    const param={
      emlx : localStorage.getItem("email"),
      kdsoal : this.data
    }

    const response = await this.dataKelasService.startUjian(param)
    const { isSuccess, data, link } = response

    if(isSuccess){
        this.soal = data
        // if(link != 'null'){
          if(link != 'null' && !this.isUjianText){
          // this.link = link
          this.link = this.sanitizer.bypassSecurityTrustResourceUrl(link);
          this.isLinkAva = true
        }
        else if(link != 'null' && this.isUjianText){
          this.isLinkAva = false
        }
        else{
          this.isLinkAva = false
          // this.isLinkAva = true
        }
        console.log(this.link)
        console.log(this.isUjianText)
        this.totalsoal = this.soal.length

        // this.soal.unshift(link)
        this.soal.forEach(val => {
          val.soalimg = val.soal.substr(0,18)
          val.ax = val.a.substr(0,18)
          val.bx = val.b.substr(0,18)
          val.cx = val.c.substr(0,18)
          val.dx = val.d.substr(0,18)
          val.ex = val.e.substr(0,18)
          // if(val.link != ''){
          //   const yt = val.link
          //   this.soal.push(yt)
          // }
        });
        console.log(this.soal)
    }
    else{
      this.presentToast("Fail")
    }

  }


  async getUjian(){
    // this.presentLoadingWithOptions()
    const param={
      kdskl : localStorage.getItem("kd_skl"),
      email : localStorage.getItem("email"),
      kls : localStorage.getItem("jurusan"),
      kdsoal : this.data
    }

    const response = await this.dataKelasService.getUjian(param)
    const { isSuccess, message, data } = response

    if(isSuccess){
      var re = /:/gi;
      var newstr = data[0].wktfinish.replace(re, "")
      console.log(newstr)
      this.endwkt = Math.ceil(newstr)
      let jamEnd:number = data[0].wktfinish.substr(0,2)
      let minEnd:number = data[0].wktfinish.substr(3,2)

      let now = this.convertTZ(this.now, "Asia/Jakarta")
      let jam = (minEnd - now.getMinutes()) <0 ? (jamEnd -1 ) - now.getHours() : jamEnd - now.getHours();
      let min = (minEnd - now.getMinutes()) <0 ? (Number(minEnd) + 60) - now.getMinutes() : minEnd - now.getMinutes();
      this.tempo = Number((jam * 3600) + (min*60))
      // this.tempo = 10
      this.notifyConfig = { leftTime: moment(this.tempo)};
      this.countdown.begin()
      
      // console.log(jam, min, this.tempo)
    }
    else{
      this.presentToast(message)
    }

  }

  cekJam(){
    // console.log(this.jamnow, this.endwkt)
    if(this.jamnow >= this.endwkt){  
      const link = '/score/'+this.data
      // console.log(link)    
        this.router.navigateByUrl(link).then(() => {
          this.router.navigate(['/score'], { queryParams: this.data })
          .then(() => {
            window.location.reload();
          });
      }); 
    }
  }

  select(nosoal,nourut, jwbn){
    this.nosoal = nosoal
    this.nourut = nourut
    this.jwbn = jwbn
  }

 async saveAnswer(){
    
  const param={
    eml : localStorage.getItem("email"),
    kdsoal : this.data,
    nourut : this.nourut,
    nosoal : this.nosoal,
    jwbn : this.jwbn
  }

  console.log(param)
  const response = await this.dataKelasService.jwbSoal(param)
  const { isSuccess, message } = response

  if(isSuccess){
    this.presentToast(message)
    this.startUjian()
    this.cekJam()
  }
  else{
    this.presentToast(message)
    this.cekJam()
  }
  }

  nextTest(){
    this.isLinkAva = false
    this.isUjianText = true
  }
  next(){
    this.number +=1
    this.cekJam()
  }

  prev(){
    this.number == 1 ? 1 : this.number-=1 
    this.cekJam()
  }
  handleEvent($event){
    // if($event.action == 'done'){ 
    //   const link = '/score/'+this.data
    //   console.log(link)    
    //     this.router.navigateByUrl(link).then(() => {
    //       window.location.reload();
    //   }); 
    // }
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
    this.router.navigateByUrl('/list-ujian', { skipLocationChange: true }).then(() => {
      this.router.navigate(['list-ujian'])
      .then(() => {
        window.location.reload();
      });
  }); 
  }
  
  convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
}
