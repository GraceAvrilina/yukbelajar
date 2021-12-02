import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DataKelasService} from '../../service/data-kelas.service'
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  score
  data
  kdUjian
  mapel
  nama

  constructor(
    private router: Router,
    public toastController: ToastController,
    private dataKelasService : DataKelasService,
    private _Activatedroute:ActivatedRoute,
    ) {      
      this.data=this._Activatedroute.snapshot.paramMap.get("id");
      this.nama = localStorage.getItem("name")
      // localStorage.setItem("isFinish", 'true')
     }

  ngOnInit() {
    this.finish()
    this.getUjian()
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

  async done(){
        
    const param={
      kdskl : localStorage.getItem("kd_skl"),
      email : localStorage.getItem("email"),
      kdsoal : this.data
    }

    const response = await this.dataKelasService.done(param)
    const { isSuccess, message } = response

    if(isSuccess){
      this.close()
    }
    else{
      this.presentToast(message)
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
        this.kdUjian = data[0].kduji
        this.mapel = data[0].mapel
    }
    else{
      this.presentToast(message)
    }

  }

  
  close() {
    // this.router.navigate(['home'])
    this.router.navigateByUrl('/list-ujian', { skipLocationChange: false }).then(() => {
      this.router.navigate(['list-ujian'])
      .then(() => {
        window.location.reload();
      });
  });  
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
