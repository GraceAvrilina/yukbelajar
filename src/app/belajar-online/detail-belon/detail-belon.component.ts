import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DataKelasService} from '../../service/data-kelas.service'
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-detail-belon',
  templateUrl: './detail-belon.component.html',
  styleUrls: ['./detail-belon.component.scss'],
})
export class DetailBelonComponent implements OnInit {
data
datamapel
  constructor(
    private _Activatedroute:ActivatedRoute,
    private router:Router,
    public sanitizer: DomSanitizer,
    public toastController: ToastController,
    private dataKelasService : DataKelasService) {
    this.data=this._Activatedroute.snapshot.paramMap.get("id"); 
   }

  ngOnInit() {
    console.log(this.data)
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

  async record(id){
    console.log("recorded!")
    
      const param={
        kdskl : localStorage.getItem("kd_skl"),
        nis : localStorage.getItem("induk"),
        nama : localStorage.getItem("name"),
        kelas : localStorage.getItem("kls"),
        kdmapel : this.data,
        idmateri : id
      }

      const response = await this.dataKelasService.recordBelon(param)
      const { isSuccess, message } = response

      if(isSuccess){
        console.log(message)
      }
      else{
        this.presentToast(message)
      }
  }
  async getMapel(){
    const param={
      kdskl : localStorage.getItem("kd_skl"),
      kelas : localStorage.getItem("kls"),
      kdmapel : this.data
    }

    const response = await this.dataKelasService.getDetailMapel(param)
    const { isSuccess, message, data } = response

    if(data){
        this.datamapel = data
        this.datamapel.forEach(val => {
          if(val.link!=''){
            val.link= "https://youtube.com/embed/" + val.link
            val.links = this.sanitizer.bypassSecurityTrustResourceUrl(val.link);
          }
        });
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
  this.router.navigate(['belajar-online'])
    // this.router.navigateByUrl('/belajar-online', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['belajar-online'])
      // .then(() => {
      //   window.location.reload();
      // });
  // }); 
}

}
