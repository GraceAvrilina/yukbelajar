import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../service/data-kelas.service'

@Component({
  selector: 'app-nilai-sikap',
  templateUrl: './nilai-sikap.component.html',
  styleUrls: ['./nilai-sikap.component.scss'],
})
export class NilaiSikapComponent implements OnInit {
datas
isEmpty

automaticClose = false;
isOpen = false;

list2:any[]=[]
automaticClose2 = false;
isOpen2 = false;
  constructor(
    private router:Router,
    // private admin:auth,
    private alertController: AlertController,
    private toastController: ToastController,
    private dataKelasService : DataKelasService) { }

  ngOnInit() {
    this.getData()
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getData().then(function(){      
      event.target.complete();
    })
    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   event.target.complete();
    // }, 2000);
  }
  
  async getData(){

    const param={
      eml : localStorage.getItem("email")
    }
  
    const response = await this.dataKelasService.infoQuiz(param)
    const { isSuccess, message, result } = response
  
    if(result.length>0){
    // this.missLoading()
        this.datas = result
        console.log(result)
        this.isEmpty= false
    }
    else{
      this.isEmpty = true
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

toogleSection(val){
  this.isOpen = !this.isOpen
  if(this.automaticClose && this.isOpen) {
    this.isOpen=true
  }
  // else this.isOpen=false  
}

toogleSection2(index){
  // this.isOpen2 = !this.isOpen2
  // if(this.automaticClose2 && this.isOpen2) {
  //   this.isOpen2=true
  // }
  
  this.list2[index].open = !this.list2[index].open;

  if (this.automaticClose2 && this.list2[index].open) {
    this.list2
    .filter((x, xIndex) => xIndex != index)
    .map(x => x.open = false);
  }
  // else this.isOpen=false  
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
