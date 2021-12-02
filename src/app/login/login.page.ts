import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { ModalController,LoadingController,ToastController,Platform,AlertController } from "@ionic/angular";
import { ModalLupaPswdComponent } from "../widget/modal-lupa-pswd/modal-lupa-pswd.component";
import {LoginService} from '../service/login.service'
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public params: any = {
    email: "",
    password: "",
  }
  
  public isidata:any ={
    kodeSekolah:'',
    namaSekolah:'',
    nis:'',
    nama:'',
    kelas:'',
    email:'',
    level:'',
    id:'',
    imgUrl:'default',
    lat:0.1,
    long:0.1,
    sort_nama:'',
    status:'offline',
    username:''
  }
  passwordType: string = 'password';
 passwordIcon: string = 'eye-off';
  constructor(private router: Router,
    private modalController: ModalController,
    public toastController: ToastController,
    private loginservice: LoginService) {
      // window.onbeforeunload = function() 
      // {
      //   localStorage.clear()
      // }
    }

  ngOnInit() {
  }
  
  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async userLogin(){
    const param = {
      email: this.params.email,
      password: this.params.password
    };
   

    const response = await this.loginservice.userLogin(param);
    const { isSuccess, message , position, kdskl, name,email,jurusan, noinduk, nmskl,kls} = response;

    if(isSuccess){
      localStorage.setItem("name", name);      
      localStorage.setItem("email", email);      
      localStorage.setItem("position", position);
      localStorage.setItem("kd_skl", kdskl);
      localStorage.setItem("nmskl", nmskl);
      localStorage.setItem("induk", noinduk);
      localStorage.setItem("jurusan", jurusan);
      localStorage.setItem("kls", kls);
     
      
      firebase.database().ref('dtUsers/').orderByChild('email').equalTo(this.params.email).once('value', snapshot => {
      if (!snapshot.exists()) {      
        firebase.auth().createUserWithEmailAndPassword(this.params.email, this.params.password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          var userId= userCredential.user.uid;
          // var userId= 'mDIo8wYBxQVCRQdx7ULDXsCCQsv1'

          this.isidata.level= position
          this.isidata.kodeSekolah= kdskl
          this.isidata.nama= name
          this.isidata.email= email
          this.isidata.kelas= kls
          this.isidata.nis= noinduk
          this.isidata.namaSekolah= nmskl
          this.isidata.id= userId
          this.isidata.sort_nama= name
            
          const newRoomUser = firebase.database().ref('dtUsers/')
          newRoomUser.child(userId).set(this.isidata).then( function(){
            console.log("berhasil")
          })
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          // ..
        });
      }
    });


      this.router.navigate(['/home'])  
    }
    else{
      this.presentToast(message)
    }
  }

  
  selectMenu(url) {
    // this.router.navigateByUrl(url)

    let navigationExtras: NavigationExtras = {
      state: {
        reload: true
      }
    }
    this.router.navigate([url], navigationExtras)
  }

  login(url){
    let navigationExtras: NavigationExtras = {
      state: {
        reload: true
      }
    }
    this.router.navigate([url], navigationExtras)
    .then(() => {
      window.location.reload();
    });
    localStorage.setItem("email", this.params.email)
  }


  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}

  async presentModalForgetPass() {
    const modal = await this.modalController.create({
      component: ModalLupaPswdComponent,
      // componentProps: { value: 123 }
    });

    modal.onDidDismiss().then(res => {});

    return await modal.present();
  }
  
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};