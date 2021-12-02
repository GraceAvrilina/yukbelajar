import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../service/data-kelas.service'
import {DomSanitizer} from '@angular/platform-browser';
// import { HTTP } from '@ionic-native/http/ngx';
// import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-list-tugas',
  templateUrl: './list-tugas.component.html',
  styleUrls: ['./list-tugas.component.scss'],
})

export class ListTugasComponent implements OnInit {

  public dataTugas
  // isLinkAva:boolean = false
  constructor(
    private router:Router,
    private alertController: AlertController,
    public sanitizer: DomSanitizer,
    // private nativeHTTP: HTTP,
    // private file: File,
    private toastController: ToastController,
    private dataKelasService : DataKelasService) { }

  ngOnInit() {
    this.getTugas()
  }
  
  doRefresh(event) {
    console.log('Begin async operation');
    this.getTugas().then(function(){      
      event.target.complete();
    })
    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   event.target.complete();
    // }, 2000);
  }
  async getTugas(){
    const param={
      email : localStorage.getItem("email")
    }

    const response = await this.dataKelasService.listTugas(param)
    const { isSuccess, message, data } = response

    if(data){
        this.dataTugas = data
        this.dataTugas.forEach(val => {          
          val.yt = this.sanitizer.bypassSecurityTrustResourceUrl(val.yt);
        });
        console.log(data)
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

//   private downloadFileAndStore() {
//     //
//    let fileName = 'filename.type';
//     const filePath = this.file.dataDirectory + fileName; 
//                      // for iOS use this.file.documentsDirectory
    
//     this.nativeHTTP.downloadFile('your-url', {}, {}, filePath).then(response => {
//        // prints 200
//        console.log('success block...', response);
//     }).catch(err => {
//         // prints 403
//         console.log('error block ... ', err.status);
//         // prints Permission denied
//         console.log('error block ... ', err.error);
//     })
// }

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
