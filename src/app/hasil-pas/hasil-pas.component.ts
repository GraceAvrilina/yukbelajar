import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController,ToastController, AlertController} from "@ionic/angular";
import {DataKelasService} from '../service/data-kelas.service'

@Component({
  selector: 'app-hasil-pas',
  templateUrl: './hasil-pas.component.html',
  styleUrls: ['./hasil-pas.component.scss'],
})
export class HasilPasComponent implements OnInit {
  datas
  isEmpty:boolean=false
  
  automaticClose = false;
  isOpen = false;
  
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
      
        const response = await this.dataKelasService.infoUas(param)
        const { isSuccess, message, result } = response 
      
        if(result.length>0){
        // this.missLoading()
            this.datas = result
            console.log(result)
            this.isEmpty = false
        }
        else{
          this.presentToast(message)
          this.isEmpty=true
        }
      }
      
  toogleSection(val,i){
    this.isOpen = !this.isOpen
    if(this.automaticClose && this.isOpen) {
      this.isOpen=true
    }
    // else this.isOpen=false  
  }
  
  toogleSection2(val,i){
    this.isOpen2 = !this.isOpen2
    if(this.automaticClose2 && this.isOpen2) {
      this.isOpen2=true
    }
    // else this.isOpen=false  
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
