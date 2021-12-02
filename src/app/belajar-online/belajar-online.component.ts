import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../service/data-kelas.service'

@Component({
  selector: 'app-belajar-online',
  templateUrl: './belajar-online.component.html',
  styleUrls: ['./belajar-online.component.scss'],
})
export class BelajarOnlineComponent implements OnInit {
datamapel
  constructor(
    private router:Router,
    public toastController: ToastController,
    private dataKelasService : DataKelasService,) { }

  ngOnInit() {
    this.getMapel()
  }
  
  doRefresh(event) {
    console.log('Begin async operation');
    this.getMapel().then(function(){      
      event.target.complete();
    })
    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   event.target.complete();
    // }, 2000);
  }
  
  async getMapel(){
    const param={
      kdskl : localStorage.getItem("kd_skl")
    }

    const response = await this.dataKelasService.getDataMapel(param)
    const { isSuccess, message, data } = response

    if(isSuccess){
        this.datamapel = data
        console.log(this.datamapel)
    }
    else{
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
