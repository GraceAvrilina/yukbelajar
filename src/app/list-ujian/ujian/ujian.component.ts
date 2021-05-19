import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DataKelasService} from '../../service/data-kelas.service'
import {ToastController} from "@ionic/angular";

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
  constructor(
    private router: Router,
    public toastController: ToastController,
    private dataKelasService : DataKelasService,
    private _Activatedroute:ActivatedRoute,
    ) {      
    this.data=this._Activatedroute.snapshot.paramMap.get("id");
    }

  ngOnInit() {
    this.startUjian()
  }

  async startUjian(){    
    const param={
      emlx : localStorage.getItem("email"),
      kdsoal : this.data
    }

    const response = await this.dataKelasService.startUjian(param)
    const { isSuccess, data } = response

    if(isSuccess){
        this.soal = data
        this.totalsoal = this.soal.length
    }
    else{
      this.presentToast("Fail")
    }

  }

  async finish(){    
    const param={
      kdskl : localStorage.getItem("kd_skl"),
      email : localStorage.getItem("email"),
      kdsoal : this.data
    }

    const response = await this.dataKelasService.getScore(param)
    const { isSuccess, score } = response

    if(isSuccess){
        this.score = score
    }
    else{
      this.presentToast("Fail")
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

  const response = await this.dataKelasService.jwbSoal(param)
  const { isSuccess, message } = response

  if(isSuccess){
    this.presentToast(message)
    this.startUjian()
  }
  else{
    this.presentToast(message)
  }
  }
  next(){
    this.number +=1
  }

  prev(){
    this.number == 1 ? 1 : this.number-=1 
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
      this.router.navigate(['list-ujian']);
  }); 
  }
}
