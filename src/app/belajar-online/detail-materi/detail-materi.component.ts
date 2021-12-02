import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../../service/data-kelas.service'

@Component({
  selector: 'app-detail-materi',
  templateUrl: './detail-materi.component.html',
  styleUrls: ['./detail-materi.component.scss'],
})
export class DetailMateriComponent implements OnInit {
  data
  datamapel
  constructor(
    private router:Router,
    public sanitizer: DomSanitizer,
    public toastController: ToastController,
    private dataKelasService : DataKelasService,
    private _Activatedroute:ActivatedRoute,    ) {      
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
  
  async getMapel(){
    const param={
      kdskl : localStorage.getItem("kd_skl"),
      trax : this.data
    }

    const response = await this.dataKelasService.getDetailMateri(param)
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
      // this.presentToast(message)
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
      this.router.navigateByUrl('/belajar-online', { skipLocationChange: true }).then(() => {
        this.router.navigate(['belajar-online'])
        // .then(() => {
        //   window.location.reload();
        // });
    }); 
  }
}
